package blog.library;

import java.net.URI;
import java.util.List;
import jakarta.validation.Valid;
import jakarta.validation.constraints.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class LibraryController {
    private final LibraryService service;
    public LibraryController(LibraryService service) { this.service = service; }
    public record CreateBook(@NotBlank @Size(max = 80) String title,
                             @NotBlank @Size(max = 60) String author,
                             @NotNull @Min(1) @Max(100) Integer totalCopies) {}
    public record BorrowBook(@NotNull @Positive Long bookId, @NotBlank @Size(max = 60) String borrower) {}

    @GetMapping("/books") public BookPage books(@RequestParam(defaultValue = "") String q,
        @RequestParam(defaultValue = "1") int page, @RequestParam(defaultValue = "10") int size) {
        return service.books(q, page, size);
    }
    @GetMapping("/books/{id}") public Book book(@PathVariable long id) { return service.book(id); }
    @PostMapping("/books") public ResponseEntity<Book> createBook(@Valid @RequestBody CreateBook request) {
        Book book = service.createBook(request.title(), request.author(), request.totalCopies());
        return ResponseEntity.created(URI.create("/api/books/" + book.id())).body(book);
    }
    @DeleteMapping("/books/{id}") public ResponseEntity<Void> deleteBook(@PathVariable long id) {
        service.deleteBook(id);
        return ResponseEntity.noContent().build();
    }
    @GetMapping("/loans") public List<Loan> loans(@RequestParam(required = false) String active) {
        return service.loans(active);
    }
    @GetMapping("/loans/{id}") public Loan loan(@PathVariable long id) { return service.loan(id); }
    @PostMapping("/loans") public ResponseEntity<Loan> borrow(@Valid @RequestBody BorrowBook request) {
        Loan loan = service.borrow(request.bookId(), request.borrower());
        return ResponseEntity.created(URI.create("/api/loans/" + loan.id())).body(loan);
    }
    @PostMapping("/loans/{id}/return") public Loan returnLoan(@PathVariable long id) {
        return service.returnLoan(id);
    }
}
