package com.prelude.randomz.dto.response;

import com.prelude.randomz.entity.enums.GameModeEnum;
import com.prelude.randomz.entity.enums.RoomStatusEnum;

import java.time.Instant;
import java.util.UUID;

public record RoomResponse(
        UUID id,
        String name,
        String description,
        RoomStatusEnum status,
        GameModeEnum currentMode,
        Instant startTime,
        Long duration
) {}
