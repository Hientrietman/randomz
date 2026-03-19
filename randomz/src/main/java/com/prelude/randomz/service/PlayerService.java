package com.prelude.randomz.service;

import com.prelude.randomz.dto.request.PlayerRequest;
import com.prelude.randomz.dto.response.PlayerResponse;

public interface PlayerService {
    PlayerResponse create(PlayerRequest request);
}
