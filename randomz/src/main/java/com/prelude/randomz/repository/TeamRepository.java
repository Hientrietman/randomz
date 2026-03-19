package com.prelude.randomz.repository;

import com.prelude.randomz.entity.Team;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface TeamRepository extends JpaRepository<Team, UUID> {
    Optional<Team> findByIdAndIsDeletedFalse(UUID id);
}

