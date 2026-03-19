package com.prelude.randomz.controller;

import com.prelude.randomz.common.ApiResponse;
import com.prelude.randomz.dto.request.TeamRequest;
import com.prelude.randomz.dto.response.TeamResponse;
import com.prelude.randomz.service.TeamService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/teams")
@RequiredArgsConstructor
public class TeamController {
    private final TeamService teamService;

    @PostMapping
    public ResponseEntity<ApiResponse<TeamResponse>> create(@RequestBody @Valid TeamRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.created(teamService.create(request)));
    }
}

