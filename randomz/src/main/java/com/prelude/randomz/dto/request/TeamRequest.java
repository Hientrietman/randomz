package com.prelude.randomz.dto.request;

import jakarta.validation.constraints.NotBlank;

public record TeamRequest(
        @NotBlank String name
) {
}

