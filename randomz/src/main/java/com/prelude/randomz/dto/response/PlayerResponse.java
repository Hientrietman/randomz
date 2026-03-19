package com.prelude.randomz.dto.response;

import java.util.UUID;

public record PlayerResponse(
        UUID id,
        String name
) {}
