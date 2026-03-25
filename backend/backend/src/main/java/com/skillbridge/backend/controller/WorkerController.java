package com.skillbridge.backend.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.*;

import com.skillbridge.backend.model.Worker;
import com.skillbridge.backend.model.Job;
import com.skillbridge.backend.repository.WorkerRepository;
import com.skillbridge.backend.repository.JobRepository;

@RestController
@RequestMapping("/workers")
public class WorkerController {

    @Autowired
    private WorkerRepository workerRepository;

    @Autowired
    private JobRepository jobRepository;

    /**
     * Register a new worker
     * @param worker Worker object from request body
     * @return Saved worker with skill passport ID
     */
    @PostMapping("/register")
    public Worker registerWorker(@RequestBody Worker worker) {
        try {
            // Generate skill passport ID
            String skillPassportId = "SKILL_" + (System.currentTimeMillis() % 10000);
            worker.skillPassportId = skillPassportId;
            
            // Save worker to database
            Worker savedWorker = workerRepository.save(worker);
            return savedWorker;
        } catch (Exception e) {
            System.out.println("Error registering worker: " + e.getMessage());
            return null;
        }
    }

    /**
     * Find matched jobs for a worker based on skill and location
     * @param workerId Worker ID
     * @return List of matched jobs
     */
    @GetMapping("/{workerId}/jobs")
    public List<Job> matchJobs(@PathVariable int workerId) {
        try {
            // Get worker details
            Worker worker = workerRepository.findById(workerId).orElse(null);
            
            if (worker == null) {
                System.out.println("Worker not found with ID: " + workerId);
                return new ArrayList<>();
            }
            
            // Find matched jobs based on skill and location
            List<Job> matchedJobs = jobRepository.findMatchedJobs(worker.skill, worker.location);
            return matchedJobs;
        } catch (Exception e) {
            System.out.println("Error finding matched jobs: " + e.getMessage());
            return new ArrayList<>();
        }
    }

    /**
     * Get all workers
     * @return List of all workers
     */
    @GetMapping("")
    public List<Worker> getAllWorkers() {
        try {
            return workerRepository.findAll();
        } catch (Exception e) {
            System.out.println("Error fetching workers: " + e.getMessage());
            return new ArrayList<>();
        }
    }

    /**
     * Login endpoint for worker authentication
     * @param loginData Map containing email and password
     * @return Worker object if credentials match, null otherwise
     */
    @PostMapping("/login")
    public Worker loginWorker(@RequestBody Map<String, String> loginData) {
        try {
            String email = loginData.get("email");
            String password = loginData.get("password");
            
            if (email == null || password == null) {
                System.out.println("Email or password missing");
                return null;
            }
            
            // Find worker by email
            List<Worker> workers = workerRepository.findAll();
            for (Worker worker : workers) {
                if (worker.email != null && worker.email.equals(email)) {
                    // Compare passwords (simple comparison for now)
                    if (worker.password != null && worker.password.equals(password)) {
                        // Return worker (without password for security)
                        worker.password = null;
                        return worker;
                    }
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

    /**
     * Get worker by email
     * @param email Worker email
     * @return Worker object or null
     */
    @GetMapping("/email/{email}")
    public Worker getWorkerByEmail(@PathVariable String email) {
        try {
            List<Worker> workers = workerRepository.findAll();
            for (Worker worker : workers) {
                if (worker.email != null && worker.email.equals(email)) {
                    return worker;
                }
            }
            return null;
        } catch (Exception e) {
            System.out.println("Error fetching worker by email: " + e.getMessage());
            return null;
        }
    }
}
