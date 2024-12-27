package com.example.back_end.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "bets")
public class Bet {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private com.example.horsebettingbackend.model.User user;

    @ManyToOne
    @JoinColumn(name = "horse_id", nullable = false)
    private Horse horse;

    private Double amount;
    private Double potentialWinnings;

    private boolean isWinningBet;
    private LocalDateTime placedAt;
}
