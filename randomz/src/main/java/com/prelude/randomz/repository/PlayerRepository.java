package com.prelude.randomz.repository;

import com.prelude.randomz.entity.Player;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface PlayerRepository extends JpaRepository<Player, UUID> {
    Optional<Player> findByIdAndIsDeletedFalse(UUID id);
}
