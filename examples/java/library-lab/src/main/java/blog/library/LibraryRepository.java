package blog.library;

import java.sql.Timestamp;
import java.util.List;
import java.util.Optional;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.stereotype.Repository;

@Repository
public class LibraryRepository {
    private final JdbcTemplate jdbc;
    private static final RowMapper<Book> BOOK = (rs, row) -> new Book(rs.getLong("id"),
        rs.getString("title"), rs.getString("author"), rs.getInt("total_copies"), rs.getInt("available_copies"));
    private static final RowMapper<Loan> LOAN = (rs, row) -> {
        Timestamp returned = rs.getTimestamp("returned_at");
        return new Loan(rs.getLong("id"), rs.getLong("book_id"), rs.getString("book_title"),
            rs.getString("borrower"), rs.getTimestamp("created_at").toInstant(),
            returned == null ? null : returned.toInstant());
    };
    private static final String LOAN_SELECT = "SELECT l.*, b.title AS book_title FROM loans l JOIN books b ON b.id = l.book_id";

    public LibraryRepository(JdbcTemplate jdbc) { this.jdbc = jdbc; }

    public BookPage books(String query, int page, int size) {
        // ! is the explicit LIKE escape character, so % and _ in user input remain literal.
        String pattern = "%" + query.replace("!", "!!").replace("%", "!%").replace("_", "!_") + "%";
        String where = " WHERE LOWER(title) LIKE LOWER(?) ESCAPE '!' OR LOWER(author) LIKE LOWER(?) ESCAPE '!'";
        long total = jdbc.queryForObject("SELECT COUNT(*) FROM books" + where, Long.class, pattern, pattern);
        List<Book> items = jdbc.query("SELECT * FROM books" + where + " ORDER BY id DESC LIMIT ? OFFSET ?",
            BOOK, pattern, pattern, size, ((long) page - 1) * size);
        return new BookPage(items, total, page, size);
    }

    public Optional<Book> book(long id) {
        return jdbc.query("SELECT * FROM books WHERE id = ?", BOOK, id).stream().findFirst();
    }

    public Book createBook(String title, String author, int copies) {
        var key = new GeneratedKeyHolder();
        jdbc.update(connection -> {
            var statement = connection.prepareStatement(
                "INSERT INTO books(title, author, total_copies, available_copies) VALUES (?, ?, ?, ?)", new String[] {"id"});
            statement.setString(1, title); statement.setString(2, author);
            statement.setInt(3, copies); statement.setInt(4, copies);
            return statement;
        }, key);
        return book(key.getKey().longValue()).orElseThrow();
    }

    public int deleteUnusedBook(long id) {
        return jdbc.update("DELETE FROM books WHERE id = ? AND NOT EXISTS (SELECT 1 FROM loans WHERE book_id = ?)", id, id);
    }

    public int takeCopy(long id) {
        return jdbc.update("UPDATE books SET available_copies = available_copies - 1 WHERE id = ? AND available_copies > 0", id);
    }

    public void restoreCopy(long id) {
        jdbc.update("UPDATE books SET available_copies = available_copies + 1 WHERE id = ?", id);
    }

    public Loan createLoan(long bookId, String borrower) {
        var key = new GeneratedKeyHolder();
        jdbc.update(connection -> {
            var statement = connection.prepareStatement(
                "INSERT INTO loans(book_id, borrower) VALUES (?, ?)", new String[] {"id"});
            statement.setLong(1, bookId); statement.setString(2, borrower);
            return statement;
        }, key);
        return loan(key.getKey().longValue()).orElseThrow();
    }

    public Optional<Loan> loan(long id) {
        return jdbc.query(LOAN_SELECT + " WHERE l.id = ?", LOAN, id).stream().findFirst();
    }

    public List<Loan> loans(Boolean active) {
        String condition = active == null ? "" : active ? " WHERE l.returned_at IS NULL" : " WHERE l.returned_at IS NOT NULL";
        return jdbc.query(LOAN_SELECT + condition + " ORDER BY l.created_at DESC, l.id DESC LIMIT 100", LOAN);
    }

    public int markReturned(long id) {
        return jdbc.update("UPDATE loans SET returned_at = CURRENT_TIMESTAMP WHERE id = ? AND returned_at IS NULL", id);
    }
}
