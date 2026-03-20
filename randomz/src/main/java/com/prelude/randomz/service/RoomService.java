package com.prelude.randomz.service;

import com.prelude.randomz.dto.request.RoomRequest;
import com.prelude.randomz.dto.response.RoomResponse;
import org.springframework.data.domain.Page;

public interface RoomService {
    RoomResponse create(RoomRequest request);
    Page<RoomResponse> getAll(int page, int size);
}

