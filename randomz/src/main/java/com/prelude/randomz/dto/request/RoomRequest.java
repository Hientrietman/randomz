package com.prelude.randomz.dto.request;

import com.prelude.randomz.entity.enums.GameModeEnum;
import jakarta.validation.constraints.NotBlank;

import java.util.UUID;

public record RoomRequest(
        @NotBlank String name,
        String description,
        GameModeEnum currentMode,
        Long duration,
        UUID teamId
) {}
