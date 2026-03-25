package com.skillbridge.backend.service;

import com.skillbridge.backend.model.Job;
import com.skillbridge.backend.repository.JobRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class JobService {

    @Autowired
    private JobRepository jobRepository;

    public Job createJob(Job job) {
        return jobRepository.save(job);
    }

    public List<Job> getAllJobs() {
        return jobRepository.findAll();
    }

    public Job getJobById(int jobId) {
        return jobRepository.findById(jobId).orElse(null);
    }

    public List<Job> findMatchedJobs(String skill, String location) {
        return jobRepository.findMatchedJobs(skill, location);
    }

    public Job updateJob(int jobId, Job job) {
        if (jobRepository.findById(jobId).isPresent()) {
            job.setId(jobId);
            return jobRepository.save(job);
        }
        return null;
    }

    public String deleteJob(int jobId) {
        if (jobRepository.findById(jobId).isPresent()) {
            jobRepository.deleteById(jobId);
            return "Job deleted successfully";
        }
        return "Job not found";
    }
}
