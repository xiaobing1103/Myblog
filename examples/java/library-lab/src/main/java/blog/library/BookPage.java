package blog.library;

import java.util.List;

public record BookPage(List<Book> items, long total, int page, int size) {}
