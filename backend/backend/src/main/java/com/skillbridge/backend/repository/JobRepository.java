package com.skillbridge.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;
import com.skillbridge.backend.model.Job;

public interface JobRepository extends JpaRepository<Job, Integer> {

    /**
     * Find jobs that match worker's skill and location
     * @param skill Required skill
     * @param location Job location
     * @return List of matching jobs
     */
    @Query("SELECT j FROM Job j WHERE j.skillRequired = :skill AND j.location = :location")
    List<Job> findMatchedJobs(@Param("skill") String skill, @Param("location") String location);
}
