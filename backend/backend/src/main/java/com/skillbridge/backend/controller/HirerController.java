package com.skillbridge.backend.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.*;

import com.skillbridge.backend.model.Hirer;
import com.skillbridge.backend.repository.HirerRepository;

@RestController
@RequestMapping("/hirers")
public class HirerController {

    @Autowired
    private HirerRepository hirerRepository;

    /**
     * Register a new hirer/customer
     * @param hirer Hirer object from request body
     * @return Saved hirer
     */
    @PostMapping("/register")
    public Hirer registerHirer(@RequestBody Hirer hirer) {
        try {
            // Save hirer to database
            Hirer savedHirer = hirerRepository.save(hirer);
            return savedHirer;
        } catch (Exception e) {
            System.out.println("Error registering hirer: " + e.getMessage());
            return null;
        }
    }

    /**
     * Get all hirers
     * @return List of all hirers
     */
    @GetMapping("")
    public List<Hirer> getAllHirers() {
        try {
            return hirerRepository.findAll();
        } catch (Exception e) {
            System.out.println("Error fetching hirers: " + e.getMessage());
            return new ArrayList<>();
        }
    }

    /**
     * Get hirer by ID
     * @param hirerId Hirer ID
     * @return Hirer object or null
     */
    @GetMapping("/{hirerId}")
    public Hirer getHirerById(@PathVariable int hirerId) {
        try {
            return hirerRepository.findById(hirerId).orElse(null);
        } catch (Exception e) {
            System.out.println("Error fetching hirer: " + e.getMessage());
            return null;
        }
    }

    /**
     * Find hirer by email
     * @param email Hirer email
     * @return Hirer object or null
     */
    @GetMapping("/email/{email}")
    public Hirer getHirerByEmail(@PathVariable String email) {
        try {
            return hirerRepository.findByEmail(email).orElse(null);
        } catch (Exception e) {
            System.out.println("Error fetching hirer by email: " + e.getMessage());
            return null;
        }
    }

    /**
     * Update hirer
     * @param hirerId Hirer ID
     * @param hirer Updated hirer object
     * @return Updated hirer
     */
    @PutMapping("/{hirerId}")
    public Hirer updateHirer(@PathVariable int hirerId, @RequestBody Hirer hirer) {
        try {
            if (hirerRepository.findById(hirerId).isPresent()) {
                hirer.id = hirerId;
                return hirerRepository.save(hirer);
            }
            return null;
        } catch (Exception e) {
            System.out.println("Error updating hirer: " + e.getMessage());
            return null;
        }
    }

    /**
     * Delete hirer
     * @param hirerId Hirer ID
     * @return Success message
     */
    @DeleteMapping("/{hirerId}")
    public String deleteHirer(@PathVariable int hirerId) {
        try {
            if (hirerRepository.findById(hirerId).isPresent()) {
                hirerRepository.deleteById(hirerId);
                return "Hirer deleted successfully";
            }
            return "Hirer not found";
        } catch (Exception e) {
            System.out.println("Error deleting hirer: " + e.getMessage());
            return "Error deleting hirer";
        }
    }

    /**
     * Login endpoint for hirer authentication
     * @param loginData Map containing email and password
     * @return Hirer object if credentials match, null otherwise
     */
    @PostMapping("/login")
    public Hirer loginHirer(@RequestBody Map<String, String> loginData) {
        try {
            String email = loginData.get("email");
            String password = loginData.get("password");
            
            if (email == null || password == null) {
                System.out.println("Email or password missing");
                return null;
            }
            
            // Find hirer by email
            Optional<Hirer> hirerOpt = hirerRepository.findByEmail(email);
            if (hirerOpt.isPresent()) {
                Hirer hirer = hirerOpt.get();
                // Compare passwords (simple comparison for now)
                if (hirer.password != null && hirer.password.equals(password)) {
                    // Return hirer (without password for security)
                    hirer.password = null;
                    return hirer;
                }
            }
            
            System.out.println("Invalid credentials for email: " + email);
            return null;
        } catch (Exception e) {
            System.out.println("Error during login: " + e.getMessage());
            e.printStackTrace();
            return null;
        }
    }
}
