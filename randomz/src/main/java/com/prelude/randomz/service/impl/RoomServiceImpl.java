package com.prelude.randomz.service.impl;

import com.prelude.randomz.dto.request.RoomRequest;
import com.prelude.randomz.dto.response.RoomResponse;
import com.prelude.randomz.entity.Room;
import com.prelude.randomz.repository.RoomRepository;
import com.prelude.randomz.service.RoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;

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
                .startTime(request.startTime())
                .duration(request.duration())
                .build();

        room.setRoomStatus();
        room.setIsDeleted(false);
        room.setCreatedDate(Instant.now());

        Room saved = roomRepository.save(room);
        return toResponse(saved);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<RoomResponse> getAll(int page, int size) {
        PageRequest pageRequest = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "createdDate"));
        return roomRepository.findByIsDeletedFalse(pageRequest)
                .map(this::toResponse);
    }

    private RoomResponse toResponse(Room room) {
        return new RoomResponse(
                room.getId(),
                room.getName(),
                room.getDescription(),
                room.getStatus(),
                room.getStartTime(),
                room.getDuration()
        );
    }
}

