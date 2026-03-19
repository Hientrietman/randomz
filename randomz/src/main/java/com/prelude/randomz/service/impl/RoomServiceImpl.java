package com.prelude.randomz.service.impl;

import com.prelude.randomz.dto.request.RoomRequest;
import com.prelude.randomz.dto.response.RoomResponse;
import com.prelude.randomz.entity.Room;
import com.prelude.randomz.repository.RoomRepository;
import com.prelude.randomz.service.RoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class RoomServiceImpl implements RoomService {

    private final RoomRepository roomRepository;

    @Override
    @Transactional
    public RoomResponse create(RoomRequest request) {
        Room room = Room.builder()
                .id(UUID.randomUUID())
                .name(request.name())
                .description(request.description())
                .currentMode(request.currentMode())
                .duration(request.duration())
                .build();

        room.setRoomStatus(); // default status for new rooms
        room.setStartTime(Instant.now());
        room.setIsDeleted(false);
        room.setCreatedDate(Instant.now());

        Room saved = roomRepository.save(room);
        return toResponse(saved);
    }

    private RoomResponse toResponse(Room room) {
        return new RoomResponse(
                room.getId(),
                room.getName(),
                room.getDescription(),
                room.getStatus(),
                room.getCurrentMode(),
                room.getStartTime(),
                room.getDuration()
        );
    }
}

