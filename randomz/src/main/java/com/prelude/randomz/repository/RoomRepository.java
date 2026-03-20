package com.prelude.randomz.repository;

import com.prelude.randomz.entity.Room;
import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;
import java.util.UUID;

public interface RoomRepository extends JpaRepository<Room, UUID> {

    Optional<Room> findByIdAndIsDeletedFalse(UUID id);

    Page<Room> findByIsDeletedFalse(Pageable pageable);
}

