package com.skillbridge.backend.model;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "hirers")
@JsonIgnoreProperties(ignoreUnknown = true)
public class Hirer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public int id;

    public String name;
    public String email;
    public String phone;
    public String password;
    public String location;
    public String userType; // Company, Individual, etc.
    public String aadhaar;

    public Hirer() {
    }

    public Hirer(String name, String email, String phone, String password, String location, String userType) {
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.password = password;
        this.location = location;
        this.userType = userType;
    }
}
