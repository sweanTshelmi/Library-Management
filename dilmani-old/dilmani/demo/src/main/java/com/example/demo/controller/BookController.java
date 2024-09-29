package com.example.demo.controller;

import com.example.demo.model.BookModel;
import com.example.demo.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5175")
@RestController
@RequestMapping("api/v1/book")
public class BookController {

    @Autowired
    private BookService bookService;

    @PostMapping("/addBook")
    public BookModel addBook(@RequestBody BookModel bookModel) {
        return bookService.saveBook(bookModel);
    }

    @GetMapping("/getBook/{id}")
    public BookModel findBook(@PathVariable int id) {
        return bookService.getBook(id);
    }

    @DeleteMapping("/delete/{id}")
    public String deleteBook(@PathVariable int id) {
        return bookService.deleteBook(id);
    }

    @GetMapping("/getBooks")
    public List<BookModel> getBooks() {
        return bookService.getBooks();
    }

    @PostMapping("/addBooks")
    public List<BookModel> addBooks(@RequestBody List<BookModel> books) {
        return bookService.addBooks(books);
    }

    @PutMapping("/updateBook/{id}")
    public BookModel updateBook(@RequestBody BookModel bookModel, @PathVariable int id) {
        return bookService.updateBook(id, bookModel);
    }
}
