package com.prelude.randomz.service.impl;

import com.prelude.randomz.dto.request.TeamRequest;
import com.prelude.randomz.dto.response.TeamResponse;
import com.prelude.randomz.entity.Team;
import com.prelude.randomz.repository.TeamRepository;
import com.prelude.randomz.service.TeamService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class TeamServiceImpl implements TeamService {
    private final TeamRepository teamRepository;

    @Override
    @Transactional
    public TeamResponse create(TeamRequest request) {
        Team team = Team.builder()
                .id(UUID.randomUUID())
                .name(request.name())
                .playerId(request.playerId())
                .build();

        team.setIsDeleted(false);
        team.setCreatedDate(Instant.now());

        Team saved = teamRepository.save(team);
        return toResponse(saved);
    }

    private TeamResponse toResponse(Team team) {
        return new TeamResponse(
                team.getId(),
                team.getName(),
                team.getPlayerId()
        );
    }
}

