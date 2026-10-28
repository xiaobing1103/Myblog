package blog.library;

import java.time.Instant;

public record Loan(long id, long bookId, String bookTitle, String borrower,
                   Instant createdAt, Instant returnedAt) {}
