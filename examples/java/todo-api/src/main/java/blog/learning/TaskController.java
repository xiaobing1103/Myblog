package blog.learning;

import java.net.URI;
import java.util.List;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {
    private final TaskService service;
    public TaskController(TaskService service) { this.service = service; }
    public record CreateTask(@NotBlank @Size(max = 80) String title) {}
    public record UpdateTask(@NotNull Boolean done) {}

    @GetMapping public List<Task> list() { return service.list(); }
    @GetMapping("/{id}") public Task get(@PathVariable long id) { return service.get(id); }
    @PostMapping public ResponseEntity<Task> create(@Valid @RequestBody CreateTask request) {
        Task task = service.create(request.title());
        return ResponseEntity.created(URI.create("/api/tasks/" + task.id())).body(task);
    }
    @PatchMapping("/{id}") public Task update(@PathVariable long id, @Valid @RequestBody UpdateTask request) {
        return service.complete(id, request.done());
    }
    @DeleteMapping("/{id}") public ResponseEntity<Void> delete(@PathVariable long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
