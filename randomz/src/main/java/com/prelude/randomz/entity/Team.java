package com.prelude.randomz.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.*;

import java.util.List;
import java.util.UUID;

@Entity
@Getter @Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Team extends MetaData {
    @Id
    private UUID id;
    private String name;
    private List<UUID> playerId;
}
