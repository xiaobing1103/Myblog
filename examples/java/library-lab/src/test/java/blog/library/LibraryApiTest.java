package blog.library;

import java.net.URI;
import java.net.URLEncoder;
import java.net.http.*;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.Executors;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.core.env.Environment;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.jdbc.core.JdbcTemplate;
import tools.jackson.databind.JsonNode;
import tools.jackson.databind.json.JsonMapper;
import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT,
    properties = {"spring.datasource.url=jdbc:h2:mem:library-tests;DB_CLOSE_DELAY=-1;LOCK_TIMEOUT=10000", "logging.level.root=WARN"})
class LibraryApiTest {
    @Autowired Environment environment;
    @Autowired JdbcTemplate jdbc;
    @Autowired LibraryService service;
    final HttpClient client = HttpClient.newHttpClient();
    final JsonMapper json = JsonMapper.builder().build();

    @BeforeEach void clearDatabase() {
        jdbc.update("DELETE FROM loans");
        jdbc.update("DELETE FROM books");
    }

    HttpResponse<String> request(String method, String path, String body) throws Exception {
        return client.send(HttpRequest.newBuilder(URI.create("http://127.0.0.1:" +
            environment.getProperty("local.server.port") + path))
            .header("Content-Type", "application/json")
            .method(method, HttpRequest.BodyPublishers.ofString(body)).build(), HttpResponse.BodyHandlers.ofString());
    }

    JsonNode body(HttpResponse<String> response) { return json.readTree(response.body()); }
    String encode(String value) { return URLEncoder.encode(value, StandardCharsets.UTF_8); }

    JsonNode createBook(String title, int copies) throws Exception {
        String input = json.writeValueAsString(new LibraryController.CreateBook(title, "教学作者", copies));
        var response = request("POST", "/api/books", input);
        assertEquals(201, response.statusCode(), response.body());
        JsonNode book = body(response);
        assertEquals("/api/books/" + book.get("id").asLong(), response.headers().firstValue("Location").orElseThrow());
        return book;
    }

    HttpResponse<String> borrow(long bookId, String borrower) throws Exception {
        return request("POST", "/api/loans", json.writeValueAsString(new LibraryController.BorrowBook(bookId, borrower)));
    }

    @Test void catalogPaginationAndLiteralSearch() throws Exception {
        createBook("Java 100%", 2);
        createBook("Java 基础", 1);
        createBook("SQL 进阶", 3);
        var page = body(request("GET", "/api/books?q=java&page=1&size=1", ""));
        assertEquals(2, page.get("total").asInt());
        assertEquals(1, page.get("items").size());
        assertEquals(1, page.get("page").asInt());
        var next = body(request("GET", "/api/books?q=java&page=2&size=1", ""));
        assertNotEquals(page.get("items").get(0).get("id"), next.get("items").get(0).get("id"));
        var percent = body(request("GET", "/api/books?q=" + encode("%"), ""));
        assertEquals(1, percent.get("total").asInt());
        assertEquals("Java 100%", percent.get("items").get(0).get("title").asText());
        assertEquals(0, body(request("GET", "/api/books?q=missing", "")).get("items").size());
    }

    @Test void loanLifecycleAndHistoryProtection() throws Exception {
        long bookId = createBook("事务与图书", 1).get("id").asLong();
        var borrowed = borrow(bookId, "小明");
        assertEquals(201, borrowed.statusCode(), borrowed.body());
        long loanId = body(borrowed).get("id").asLong();
        assertEquals("/api/loans/" + loanId, borrowed.headers().firstValue("Location").orElseThrow());
        assertEquals(200, request("GET", "/api/loans/" + loanId, "").statusCode());
        assertTrue(body(borrowed).get("returnedAt").isNull());
        assertEquals(0, body(request("GET", "/api/books/" + bookId, "")).get("availableCopies").asInt());
        assertEquals(1, body(request("GET", "/api/loans?active=true", "")).size());
        assertEquals(409, borrow(bookId, "小红").statusCode());
        assertEquals(409, request("DELETE", "/api/books/" + bookId, "").statusCode());
        var returned = request("POST", "/api/loans/" + loanId + "/return", "");
        assertEquals(200, returned.statusCode());
        assertFalse(body(returned).get("returnedAt").isNull());
        assertEquals(409, request("POST", "/api/loans/" + loanId + "/return", "").statusCode());
        assertEquals(1, body(request("GET", "/api/books/" + bookId, "")).get("availableCopies").asInt());
        assertEquals(0, body(request("GET", "/api/loans?active=true", "")).size());
        assertEquals(1, body(request("GET", "/api/loans?active=false", "")).size());
        assertEquals(409, request("DELETE", "/api/books/" + bookId, "").statusCode());
        long unused = createBook("没有借阅历史", 1).get("id").asLong();
        assertEquals(204, request("DELETE", "/api/books/" + unused, "").statusCode());
        assertEquals(404, request("GET", "/api/books/" + unused, "").statusCode());
    }

    @Test void rejectInvalidInputs() throws Exception {
        for (String input : List.of("{}", "broken json", "{\"title\":\"  \",\"author\":\"A\",\"totalCopies\":1}",
            "{\"title\":\"B\",\"author\":\"A\",\"totalCopies\":0}",
            "{\"title\":\"B\",\"author\":\"A\",\"totalCopies\":101}")) {
            var response = request("POST", "/api/books", input);
            assertEquals(400, response.statusCode());
            assertTrue(body(response).has("message"));
        }
        for (String path : List.of("/api/books?page=0", "/api/books?size=51", "/api/books?page=abc",
            "/api/books?q=" + "x".repeat(81), "/api/loans?active=abc")) {
            assertEquals(400, request("GET", path, "").statusCode(), path);
        }
        assertEquals(400, request("POST", "/api/loans", "{}").statusCode());
        assertEquals(404, borrow(999999, "读者").statusCode());
        assertEquals(404, request("POST", "/api/loans/999999/return", "").statusCode());
        assertEquals(404, request("DELETE", "/api/books/999999", "").statusCode());
    }

    @Test void sqlAndHtmlCharactersRemainData() throws Exception {
        String title = "Robert'); DROP TABLE books;-- <b>书</b>";
        long id = createBook(title, 1).get("id").asLong();
        assertEquals(title, body(request("GET", "/api/books/" + id, "")).get("title").asText());
        assertEquals(1, body(request("GET", "/api/books?q=" + encode("DROP TABLE"), "")).get("total").asInt());
        assertEquals(201, borrow(id, "<script>alert(1)</script>").statusCode());
    }

    @Test void concurrentBorrowAndReturnAreAtomic() throws Exception {
        long id = createBook("只有一本的书", 1).get("id").asLong();
        try (var executor = Executors.newFixedThreadPool(2)) {
            var start = new CountDownLatch(1);
            var first = executor.submit(() -> {start.await(); return borrow(id, "A");});
            var second = executor.submit(() -> {start.await(); return borrow(id, "B");});
            start.countDown();
            var left = first.get(); var right = second.get();
            assertEquals(List.of(201, 409), List.of(left.statusCode(), right.statusCode()).stream().sorted().toList());
            long loanId = body(left.statusCode() == 201 ? left : right).get("id").asLong();
            var returning = new CountDownLatch(1);
            var a = executor.submit(() -> {returning.await(); return request("POST", "/api/loans/" + loanId + "/return", "").statusCode();});
            var b = executor.submit(() -> {returning.await(); return request("POST", "/api/loans/" + loanId + "/return", "").statusCode();});
            returning.countDown();
            assertEquals(List.of(200, 409), List.of(a.get(), b.get()).stream().sorted().toList());
            assertEquals(1, body(request("GET", "/api/books/" + id, "")).get("availableCopies").asInt());
        }
    }

    @Test void failedLoanInsertRollsBackStock() throws Exception {
        long id = createBook("回滚检查", 1).get("id").asLong();
        // Bypass HTTP validation deliberately to force a DB failure after the stock update.
        assertThrows(DataIntegrityViolationException.class, () -> service.borrow(id, "x".repeat(61)));
        assertEquals(1, body(request("GET", "/api/books/" + id, "")).get("availableCopies").asInt());
        assertEquals(0, body(request("GET", "/api/loans", "")).size());
    }

    @Test void servesFrontendFromSameOrigin() throws Exception {
        var home = request("GET", "/", "");
        assertEquals(200, home.statusCode());
        assertTrue(home.body().contains("小型图书借阅管理台"));
        assertEquals(200, request("GET", "/app.js", "").statusCode());
        assertEquals(200, request("GET", "/style.css", "").statusCode());
    }
}
