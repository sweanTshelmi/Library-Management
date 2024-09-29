package com.example.demo.controller;

import com.example.demo.model.UserModel;
import com.example.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("api/v1/user")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/addUser")
    public UserModel addUser(@RequestBody UserModel userModel) {
        return userService.saveUser(userModel);
    }

    @GetMapping("/getUser/{id}")
    public UserModel findUser(@PathVariable int id) {
        return userService.getUser(id);
    }

    @DeleteMapping("/delete/{id}")
    public String deleteUser(@PathVariable int id) {
        return userService.deleteUser(id);
    }

    @GetMapping("/getUsers")
    public List<UserModel> getUsers() {
        return userService.getUsers();
    }

    @PostMapping("/addUsers")
    public List<UserModel> addUsers(@RequestBody List<UserModel> users) {
        return userService.addUsers(users);
    }

    @PutMapping("/updateUser/{id}")
    public UserModel updateUser(@RequestBody UserModel userModel, @PathVariable int id) {
        return userService.updateUser(id, userModel);
    }
}
