package com.prelude.randomz.service;

import com.prelude.randomz.dto.request.TeamRequest;
import com.prelude.randomz.dto.response.TeamResponse;

public interface TeamService {
    TeamResponse create(TeamRequest request);
}

