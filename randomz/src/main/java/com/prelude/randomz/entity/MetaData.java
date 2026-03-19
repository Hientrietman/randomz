package com.prelude.randomz.entity;

import jakarta.persistence.MappedSuperclass;
import lombok.Getter;
import lombok.Setter;

import java.time.Instant;

@MappedSuperclass
@Getter
@Setter
public class MetaData {
    private Instant createdDate;
    private Instant updatedDate;
    private Instant deletedDate;
    private String createdBy;
    private String updatedBy;
    private String deletedBy;
    private Boolean isDeleted = false;
}
