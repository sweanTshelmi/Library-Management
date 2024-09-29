package com.example.demo.service;

import com.example.demo.model.BookModel;

import com.example.demo.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookService {
    @Autowired
    private BookRepository bookRepository;

    public BookModel saveBook(BookModel bookModel) {
        return bookRepository.save(bookModel);
    }

    public BookModel getBook(int id) {
        return bookRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Book not found with id: " + id));
    }

    public String deleteBook(int id) {
        bookRepository.deleteById(id);
        return id + " removed";
    }

    public List<BookModel> getBooks() {
        return bookRepository.findAll();
    }

    public List<BookModel> addBooks(List<BookModel> books) {
        return bookRepository.saveAll(books);
    }

    public BookModel updateBook(int id, BookModel bookDetails) {
        BookModel existingBook = bookRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Book not found with id: " + id));

        // Update the fields
        existingBook.setTitle(bookDetails.getTitle());
        existingBook.setIsbn(bookDetails.getIsbn());
        existingBook.setGenre(bookDetails.getGenre());
        existingBook.setAuthor(bookDetails.getAuthor());


        return bookRepository.save(existingBook);
    }
}
