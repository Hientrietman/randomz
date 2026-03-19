package com.prelude.randomz.dto.request;

import jakarta.validation.constraints.NotBlank;

import java.util.UUID;

public record TeamRequest(
        @NotBlank String name,
        UUID playerId
) {
}

