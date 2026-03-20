package com.prelude.randomz.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.Instant;

public record RoomRequest(
        @NotBlank String name,
        String description,
        @NotNull Instant startTime,
        @NotNull Long duration
) {}
