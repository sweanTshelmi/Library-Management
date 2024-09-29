package com.example.demo.repository;

import com.example.demo.model.EmployeeModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeeRepository extends JpaRepository<EmployeeModel,Integer> {
}
