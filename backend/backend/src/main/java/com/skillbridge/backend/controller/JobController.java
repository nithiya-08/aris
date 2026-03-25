package com.skillbridge.backend.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.*;

import com.skillbridge.backend.model.Job;
import com.skillbridge.backend.service.JobService;

@RestController
@CrossOrigin(origins = {"http://127.0.0.1:5500", "http://localhost:5500", "http://localhost", "http://localhost:3000", "http://localhost:8080", "http://127.0.0.1"})
@RequestMapping("/jobs")
public class JobController {

    @Autowired
    private JobService jobService;

    /**
     * Add a new job
     * @param job Job object from request body
     * @return Saved job
     */
    @PostMapping("")
    public Job addJob(@RequestBody Job job) {
        return jobService.createJob(job);
    }

    /**
     * Get all jobs
     * @return List of all jobs
     */
    @GetMapping("")
    public List<Job> getAllJobs() {
        try {
            return jobService.getAllJobs();
        } catch (Exception e) {
            System.out.println("Error fetching jobs: " + e.getMessage());
            return new ArrayList<>();
        }
    }

    /**
     * Get job by ID
     * @param jobId Job ID
     * @return Job object or null
     */
    @GetMapping("/{jobId}")
    public Job getJobById(@PathVariable int jobId) {
        try {
            return jobService.getJobById(jobId);
        } catch (Exception e) {
            System.out.println("Error fetching job: " + e.getMessage());
            return null;
        }
    }

    /**
     * Find jobs by skill and location
     * @param skill Skill required
     * @param location Job location
     * @return List of matching jobs
     */
    @GetMapping("/search")
    public List<Job> findMatchedJobs(@RequestParam String skill, @RequestParam String location) {
        try {
            return jobService.findMatchedJobs(skill, location);
        } catch (Exception e) {
            System.out.println("Error finding matched jobs: " + e.getMessage());
            return new ArrayList<>();
        }
    }

    /**
     * Update job
     * @param jobId Job ID
     * @param job Updated job object
     * @return Updated job
     */
    @PutMapping("/{jobId}")
    public Job updateJob(@PathVariable int jobId, @RequestBody Job job) {
        try {
            return jobService.updateJob(jobId, job);
        } catch (Exception e) {
            System.out.println("Error updating job: " + e.getMessage());
            return null;
        }
    }

    /**
     * Delete job
     * @param jobId Job ID
     * @return Success message
     */
    @DeleteMapping("/{jobId}")
    public String deleteJob(@PathVariable int jobId) {
        try {
            return jobService.deleteJob(jobId);
        } catch (Exception e) {
            System.out.println("Error deleting job: " + e.getMessage());
            return "Error deleting job";
        }
    }
}

