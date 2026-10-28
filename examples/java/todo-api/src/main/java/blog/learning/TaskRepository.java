package blog.learning;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.List;
import java.util.Optional;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.stereotype.Repository;

@Repository
public class TaskRepository {
    private final JdbcTemplate jdbc;
    public TaskRepository(JdbcTemplate jdbc) { this.jdbc = jdbc; }

    public List<Task> findAll() {
        return jdbc.query("SELECT id, title, done FROM tasks ORDER BY id",
            (rs, row) -> new Task(rs.getLong("id"), rs.getString("title"), rs.getBoolean("done")));
    }

    public Optional<Task> find(long id) {
        return jdbc.query("SELECT id, title, done FROM tasks WHERE id = ?",
            (rs, row) -> new Task(rs.getLong("id"), rs.getString("title"), rs.getBoolean("done")), id).stream().findFirst();
    }

    public Task create(String title) {
        var key = new GeneratedKeyHolder();
        jdbc.update(connection -> {
            PreparedStatement statement = connection.prepareStatement(
                "INSERT INTO tasks(title, done) VALUES (?, FALSE)", Statement.RETURN_GENERATED_KEYS);
            statement.setString(1, title);
            return statement;
        }, key);
        return new Task(key.getKey().longValue(), title, false);
    }

    public int updateDone(long id, boolean done) {
        return jdbc.update("UPDATE tasks SET done = ? WHERE id = ?", done, id);
    }

    public int delete(long id) { return jdbc.update("DELETE FROM tasks WHERE id = ?", id); }
}
