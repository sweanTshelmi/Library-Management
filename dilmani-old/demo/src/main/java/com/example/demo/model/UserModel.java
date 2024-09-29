package com.example.demo.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Column;

@Entity
@Table(name = "user")
public class UserModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)  // Ensures auto-increment behavior for the primary key
    private int id;

    @Column(name = "first_name", nullable = false, length = 50)  // Optional: Defines the column properties
    private String firstName;

    @Column(name = "last_name", nullable = false, length = 50)  // Optional: Defines the column properties
    private String lastName;

    @Column(name = "email", nullable = false, unique = true, length = 100)  // Optional: Defines the column properties
    private String email;

    @Column(name = "membership_type", nullable = false, length = 20)  // Optional: Defines the column properties
    private String membershipType;

    @Column(name = "fines", nullable = false)  // Optional: Defines the column properties
    private double fines;

    // Default constructor
    public UserModel() {
    }

    // Getters and setters
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getMembershipType() {
        return membershipType;
    }

    public void setMembershipType(String membershipType) {
        this.membershipType = membershipType;
    }

    public double getFines() {
        return fines;
    }

    public void setFines(double fines) {
        this.fines = fines;
    }
}
