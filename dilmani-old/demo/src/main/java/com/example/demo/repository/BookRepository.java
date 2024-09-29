package com.example.demo.repository;

import com.example.demo.model.BookModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookRepository extends JpaRepository<BookModel,Integer> {
}
