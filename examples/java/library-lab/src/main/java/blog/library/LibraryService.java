package blog.library;

import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

@Service
@Transactional
public class LibraryService {
    private final LibraryRepository repository;
    public LibraryService(LibraryRepository repository) { this.repository = repository; }

    public BookPage books(String query, int page, int size) {
        if (query.length() > 80 || page < 1 || size < 1 || size > 50) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "关键词最多 80 字，页码至少 1，每页 1—50 条");
        }
        return repository.books(query.strip(), page, size);
    }

    public Book book(long id) {
        return repository.book(id).orElseThrow(() -> missing("图书不存在"));
    }

    public Book createBook(String title, String author, int copies) {
        return repository.createBook(title.strip(), author.strip(), copies);
    }

    public void deleteBook(long id) {
        if (repository.deleteUnusedBook(id) == 0) {
            book(id);
            throw conflict("图书已有借阅历史，不能删除");
        }
    }

    public List<Loan> loans(String active) {
        if (active != null && !active.equals("true") && !active.equals("false")) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "active 只接受 true 或 false");
        }
        return repository.loans(active == null ? null : Boolean.valueOf(active));
    }

    public Loan loan(long id) {
        return repository.loan(id).orElseThrow(() -> missing("借阅记录不存在"));
    }

    public Loan borrow(long bookId, String borrower) {
        if (repository.takeCopy(bookId) == 0) {
            book(bookId);
            throw conflict("该图书暂无可借库存");
        }
        // Both writes participate in this service transaction; an insert failure restores stock.
        return repository.createLoan(bookId, borrower.strip());
    }

    public Loan returnLoan(long id) {
        Loan loan = loan(id);
        if (repository.markReturned(id) == 0) throw conflict("该借阅已归还，请勿重复操作");
        // The conditional mark ensures that competing returns only restore stock once.
        repository.restoreCopy(loan.bookId());
        return repository.loan(id).orElseThrow();
    }

    private static ResponseStatusException missing(String message) {
        return new ResponseStatusException(HttpStatus.NOT_FOUND, message);
    }
    private static ResponseStatusException conflict(String message) {
        return new ResponseStatusException(HttpStatus.CONFLICT, message);
    }
}
