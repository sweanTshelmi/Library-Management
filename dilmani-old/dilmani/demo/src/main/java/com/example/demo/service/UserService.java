package com.example.demo.service;

import com.example.demo.model.UserModel;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public UserModel saveUser(UserModel userModel) {
        return userRepository.save(userModel);
    }

    public UserModel getUser(int Id) {
        return userRepository.findById(Id)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + Id));
    }

    public String deleteUser(int Id) {
        userRepository.deleteById(Id);
        return Id + " removed";
    }

    public List<UserModel> getUsers() {
        return userRepository.findAll();
    }

    public List<UserModel> addUsers(List<UserModel> users) {
        return userRepository.saveAll(users);
    }
    public UserModel updateUser(int memberId, UserModel userDetails) {
        UserModel existingUser = userRepository.findById(memberId)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + memberId));

        existingUser.setFirstName(userDetails.getFirstName());
        existingUser.setLastName(userDetails.getLastName());
        existingUser.setMembershipType(userDetails.getMembershipType());
        existingUser.setFines(userDetails.getFines());

        return userRepository.save(existingUser);
    }
}

