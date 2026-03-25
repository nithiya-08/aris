package com.skillbridge.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
import com.skillbridge.backend.model.Hirer;

public interface HirerRepository extends JpaRepository<Hirer, Integer> {

    /**
     * Find hirer by email
     * @param email Hirer email
     * @return Optional containing hirer if found
     */
    Optional<Hirer> findByEmail(String email);
}
