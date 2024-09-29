package com.example.demo.service;

import com.example.demo.model.EmployeeModel;
import com.example.demo.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service

public class EmployeeService {
    @Autowired
    private EmployeeRepository employeeRepository;

    public EmployeeModel saveEmployee(EmployeeModel employeeModel) {
        return employeeRepository.save(employeeModel);
    }

    public EmployeeModel getEmployee(int id) {
        return employeeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Employee not found with id: " + id));
    }

    public String deleteEmployee(int id) {
        employeeRepository.deleteById(id);
        return id + " removed";
    }

    public List<EmployeeModel> getEmployees() {
        return employeeRepository.findAll();
    }

    public List<EmployeeModel> addEmployees(List<EmployeeModel> employees) {
        return employeeRepository.saveAll(employees);
    }

    public EmployeeModel updateEmployee(int id, EmployeeModel employeeDetails) {
        EmployeeModel existingEmployee = employeeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Book not found with id: " + id));

        // Update the fields
        existingEmployee.setFirstName(employeeDetails.getFirstName());
        existingEmployee.setLastName(employeeDetails.getLastName());
        existingEmployee.setGender(employeeDetails.getGender());
        existingEmployee.setSalary(employeeDetails.getSalary());


        return employeeRepository.save(existingEmployee);
    }
}
