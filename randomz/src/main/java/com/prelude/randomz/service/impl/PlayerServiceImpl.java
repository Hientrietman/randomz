package com.prelude.randomz.service.impl;

import com.prelude.randomz.dto.request.PlayerRequest;
import com.prelude.randomz.dto.response.PlayerResponse;
import com.prelude.randomz.entity.Player;
import com.prelude.randomz.repository.PlayerRepository;
import com.prelude.randomz.service.PlayerService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class PlayerServiceImpl implements PlayerService {

    private final PlayerRepository playerRepository;

    @Override
    @Transactional
    public PlayerResponse create(PlayerRequest request) {
        Player player = Player.builder()
                .id(UUID.randomUUID())
                .name(request.name())
                .build();

        player.setIsDeleted(false);
        player.setCreatedDate(Instant.now());

        Player saved = playerRepository.save(player);
        return toResponse(saved);
    }

    private PlayerResponse toResponse(Player player) {
        return new PlayerResponse(
                player.getId(),
                player.getName()
        );
    }
}
