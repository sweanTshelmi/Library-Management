package com.example.demo.controller;

import com.example.demo.model.EmployeeModel;
import com.example.demo.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


import java.util.List;
@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("api/v1/employees")

public class EmployeeController {
    @Autowired
    private EmployeeService employeeService;

    @PostMapping("/addEmployee")
    public EmployeeModel addEmployee(@RequestBody EmployeeModel employeeModel) {
        return employeeService.saveEmployee(employeeModel);
    }

    @GetMapping("/getEmployee/{id}")
    public EmployeeModel findEmployee(@PathVariable int id) {
        return employeeService.getEmployee(id);
    }

    @DeleteMapping("/delete/{id}")
    public String deleteEmployee(@PathVariable int id) {
        return employeeService.deleteEmployee(id);
    }

    @GetMapping("/getEmployees")
    public List<EmployeeModel> getEmployees() {
        return employeeService.getEmployees();
    }

    @PostMapping("/addEmployees")
    public List<EmployeeModel> addEmployees(@RequestBody List<EmployeeModel> employees) {
        return employeeService.addEmployees(employees);
    }

    @PutMapping("/updateEmployee/{id}")
    public EmployeeModel updateEmployee(@RequestBody EmployeeModel employeeModel, @PathVariable int id) {
        return employeeService.updateEmployee(id, employeeModel);
    }
}
