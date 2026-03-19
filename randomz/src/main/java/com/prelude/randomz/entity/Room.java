package com.prelude.randomz.entity;

import com.prelude.randomz.entity.enums.GameModeEnum;
import com.prelude.randomz.entity.enums.RoomStatusEnum;
import jakarta.persistence.*;
import lombok.*;

import java.time.Instant;
import java.util.UUID;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Room extends MetaData {
    @Id
    private UUID id;
    private String name;
    private String description;
    @Enumerated(EnumType.STRING)
    private RoomStatusEnum status;
    @Enumerated(EnumType.STRING)
    private GameModeEnum currentMode;
    private Instant startTime;
    private Long duration;
    private UUID teamId;

    public void setRoomStatus (){
        this.status = RoomStatusEnum.NEW;
    }
}
