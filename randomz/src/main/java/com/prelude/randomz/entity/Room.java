package com.prelude.randomz.entity;

import com.prelude.randomz.entity.enums.GameModeEnum;
import com.prelude.randomz.entity.enums.RoomStatusEnum;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import lombok.*;

import java.time.Instant;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Room extends MetaData{
    @Id
    private Long id;
    private String name;
    private String description;
    @Enumerated(EnumType.STRING)
    private RoomStatusEnum status;
    @Enumerated(EnumType.STRING)
    private GameModeEnum currentMode;
    private Instant startTime;
    private Long duration;

    public void setRoomStatus (){
        this.status = RoomStatusEnum.NEW;
    }
}
