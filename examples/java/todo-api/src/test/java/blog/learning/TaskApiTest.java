package blog.learning;

import java.net.URI;
import java.net.http.*;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.core.env.Environment;
import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT,
    properties = "spring.datasource.url=jdbc:h2:mem:tests;DB_CLOSE_DELAY=-1")
class TaskApiTest {
    @Autowired Environment environment;
    final HttpClient client = HttpClient.newHttpClient();

    HttpResponse<String> request(String method, String path, String body) throws Exception {
        return client.send(HttpRequest.newBuilder(URI.create("http://127.0.0.1:" +
            environment.getProperty("local.server.port") + path))
            .header("Content-Type", "application/json")
            .method(method, HttpRequest.BodyPublishers.ofString(body)).build(), HttpResponse.BodyHandlers.ofString());
    }

    @Test void crudThroughRealHttp() throws Exception {
        var created = request("POST", "/api/tasks", "{\"title\":\"Learn Java\"}");
        assertEquals(201, created.statusCode());
        String location = created.headers().firstValue("Location").orElseThrow();
        assertTrue(created.body().contains("Learn Java"));
        assertEquals(200, request("GET", location, "").statusCode());
        assertTrue(request("GET", "/api/tasks", "").body().contains("Learn Java"));
        var updated = request("PATCH", location, "{\"done\":true}");
        assertEquals(200, updated.statusCode());
        assertTrue(updated.body().contains("\"done\":true"));
        assertEquals(204, request("DELETE", location, "").statusCode());
        assertEquals(404, request("GET", location, "").statusCode());
        assertEquals(404, request("PATCH", location, "{\"done\":false}").statusCode());
        assertEquals(404, request("DELETE", location, "").statusCode());
    }

    @Test void rejectInvalidInput() throws Exception {
        for (String body : new String[]{"{}", "{\"title\":\"   \"}", "{\"title\":\"" + "x".repeat(81) + "\"}"}) {
            assertEquals(400, request("POST", "/api/tasks", body).statusCode());
        }
        assertEquals(400, request("PATCH", "/api/tasks/1", "{}").statusCode());
        assertEquals(400, request("POST", "/api/tasks", "broken json").statusCode());
    }

    @Test void sqlCharactersAreData() throws Exception {
        var created = request("POST", "/api/tasks", "{\"title\":\"Robert'); DROP TABLE tasks;--\"}");
        assertEquals(201, created.statusCode());
        assertTrue(request("GET", "/api/tasks", "").body().contains("DROP TABLE"));
        request("DELETE", created.headers().firstValue("Location").orElseThrow(), "");
    }
}
