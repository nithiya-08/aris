package com.skillbridge.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.skillbridge.backend.model.Worker;

public interface WorkerRepository extends JpaRepository<Worker, Integer> {
}