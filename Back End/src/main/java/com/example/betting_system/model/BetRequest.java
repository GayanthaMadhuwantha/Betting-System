package com.example.betting_system.model;

import lombok.Getter;

import java.math.BigDecimal;

public class BetRequest {
    public Long getMatchId() {
        return matchId;
    }

    @Getter
    private Long matchId;
    private BigDecimal betAmount;
    private String betOn; // Example: "Team A", "Team B", "Draw"
    private BigDecimal odds;

    public void setMatchId(Long matchId) {
        this.matchId = matchId;
    }

    public BigDecimal getBetAmount() {
        return betAmount;
    }

    public void setBetAmount(BigDecimal betAmount) {
        this.betAmount = betAmount;
    }

    public String getBetOn() {
        return betOn;
    }

    public void setBetOn(String betOn) {
        this.betOn = betOn;
    }

    public BigDecimal getOdds() {
        return odds;
    }

    public void setOdds(BigDecimal odds) {
        this.odds = odds;
    }
// Getters and Setters
}
