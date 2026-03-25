package com.skillbridge.backend.model;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "workers")
@JsonIgnoreProperties(ignoreUnknown = true)
public class Worker {
     @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public int id;

    public String name;
    public String email;
    public String phone;
    public String password;
    public String location;
    public String skill;
    public String skillPassportId;
    public String qualification;
    public String aadhaar;
    public String skillLevel;

    // Default constructor
    public Worker() {
    }

    // Constructor with all fields
    public Worker(String name, String email, String phone, String password, String location, String skill) {
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.password = password;
        this.location = location;
        this.skill = skill;
    }
}
