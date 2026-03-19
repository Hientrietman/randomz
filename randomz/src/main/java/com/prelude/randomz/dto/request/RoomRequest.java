package com.prelude.randomz.dto.request;

import com.prelude.randomz.entity.enums.GameModeEnum;
import jakarta.validation.constraints.NotBlank;

public record RoomRequest(
        @NotBlank String name,
        String description,
        GameModeEnum currentMode,
        Long duration
) {}
