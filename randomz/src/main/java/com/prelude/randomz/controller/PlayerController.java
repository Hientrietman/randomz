package com.prelude.randomz.controller;

import com.prelude.randomz.common.ApiResponse;
import com.prelude.randomz.dto.request.PlayerRequest;
import com.prelude.randomz.dto.response.PlayerResponse;
import com.prelude.randomz.service.PlayerService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/players")
@RequiredArgsConstructor
public class PlayerController {

    private final PlayerService playerService;

    @PostMapping
    public ResponseEntity<ApiResponse<PlayerResponse>> create(@RequestBody @Valid PlayerRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.created(playerService.create(request)));
    }
}
