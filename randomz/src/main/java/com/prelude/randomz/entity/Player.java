package com.prelude.randomz.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.UUID;

@Entity
@Getter @Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Player extends MetaData {
    @Id
    private UUID id;
    private String name;
}
