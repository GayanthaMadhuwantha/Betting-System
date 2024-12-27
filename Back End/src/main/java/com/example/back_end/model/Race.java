package com.example.back_end.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.time.Instant;
import java.time.LocalDateTime;
import java.util.Date;

@Data
@Entity
@Table(name = "race")
@Getter
@Setter
public class Race {
    private boolean isCompleted;
    private Long winningHorseId;
    @Id
    private Long id;

    public LocalDateTime getStartTime() {
        return LocalDateTime.now();
    }
}
