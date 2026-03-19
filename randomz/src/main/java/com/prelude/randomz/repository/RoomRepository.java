package com.prelude.randomz.repository;

import com.prelude.randomz.entity.Room;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface RoomRepository extends JpaRepository<Room, UUID> {
    Optional<Room> findByIdAndIsDeletedFalse(UUID id);
}
