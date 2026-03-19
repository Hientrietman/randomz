package com.prelude.randomz.service;

import com.prelude.randomz.dto.request.RoomRequest;
import com.prelude.randomz.dto.response.RoomResponse;

public interface RoomService {
    RoomResponse create(RoomRequest request);
}
