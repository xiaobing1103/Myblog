package blog.learning;

import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

@Service
@Transactional
public class TaskService {
    private final TaskRepository repository;
    public TaskService(TaskRepository repository) { this.repository = repository; }
    public List<Task> list() { return repository.findAll(); }
    public Task get(long id) { return repository.find(id).orElseThrow(TaskService::missing); }
    public Task create(String title) { return repository.create(title.strip()); }
    public Task complete(long id, boolean done) {
        if (repository.updateDone(id, done) == 0) throw missing();
        return get(id);
    }
    public void delete(long id) {
        if (repository.delete(id) == 0) throw missing();
    }
    private static ResponseStatusException missing() {
        return new ResponseStatusException(HttpStatus.NOT_FOUND, "Task not found");
    }
}
