package com.prelude.randomz.entity;

import java.time.Instant;

public class MetaData {
    private Instant createdDate;
    private Instant updatedDate;
    private Instant deletedDate;
    private String createdBy;
    private String updatedBy;
    private String deletedBy;
    private Boolean isDeleted = false;
}
