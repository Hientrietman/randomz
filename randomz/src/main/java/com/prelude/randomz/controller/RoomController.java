package com.prelude.randomz.controller;

import com.prelude.randomz.common.ApiResponse;
import com.prelude.randomz.dto.request.RoomRequest;
import com.prelude.randomz.dto.response.RoomResponse;
import com.prelude.randomz.service.RoomService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/rooms")
@RequiredArgsConstructor
public class RoomController {

    private final RoomService roomService;

    @PostMapping
    public ResponseEntity<ApiResponse<RoomResponse>> create(@RequestBody @Valid RoomRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.created(roomService.create(request)));
    }
}
