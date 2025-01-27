package com.example.betting_system.model;

import jakarta.persistence.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "live_matches")
public class LiveMatch {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "team_a", nullable = false)
    private String teamA;

    @Column(name = "team_b", nullable = false)
    private String teamB;

    @Column(name = "match_time", nullable = false)
    private LocalDateTime matchTime;

    @Column(name = "status", nullable = false)
    private String status; // "SCHEDULED", "ONGOING", or "COMPLETED"

    @Column(name = "odds_team_a", nullable = false)
    private BigDecimal oddsTeamA;

    @Column(name = "odds_team_b", nullable = false)
    private BigDecimal oddsTeamB;

    @Column(name = "odds_draw", nullable = false)
    private BigDecimal oddsDraw;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt = LocalDateTime.now();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTeamA() {
        return teamA;
    }

    public void setTeamA(String teamA) {
        this.teamA = teamA;
    }

    public String getTeamB() {
        return teamB;
    }

    public void setTeamB(String teamB) {
        this.teamB = teamB;
    }

    public LocalDateTime getMatchTime() {
        return matchTime;
    }

    public void setMatchTime(LocalDateTime matchTime) {
        this.matchTime = matchTime;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public BigDecimal getOddsTeamA() {
        return oddsTeamA;
    }

    public void setOddsTeamA(BigDecimal oddsTeamA) {
        this.oddsTeamA = oddsTeamA;
    }

    public BigDecimal getOddsTeamB() {
        return oddsTeamB;
    }

    public void setOddsTeamB(BigDecimal oddsTeamB) {
        this.oddsTeamB = oddsTeamB;
    }

    public BigDecimal getOddsDraw() {
        return oddsDraw;
    }

    public void setOddsDraw(BigDecimal oddsDraw) {
        this.oddsDraw = oddsDraw;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    // Getters and setters
}

/*@Data
@Entity
@Table(name = "live_matches")
public class LiveMatch {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String teamA;

    @Column(nullable = false)
    private String teamB;

    @Column(nullable = false)
    private LocalDateTime matchTime;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private MatchStatus status; // Enum for match status

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal oddsTeamA;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal oddsTeamB;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal oddsDraw;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(nullable = false)
    private LocalDateTime updatedAt;

    // Enum for match status
    public enum MatchStatus {
        SCHEDULED,
        ONGOING,
        COMPLETED
    }

    // Constructor for convenience
    public LiveMatch(String teamA, String teamB, LocalDateTime matchTime, MatchStatus status,
                     BigDecimal oddsTeamA, BigDecimal oddsTeamB, BigDecimal oddsDraw) {
        this.teamA = teamA;
        this.teamB = teamB;
        this.matchTime = matchTime;
        this.status = status;
        this.oddsTeamA = oddsTeamA;
        this.oddsTeamB = oddsTeamB;
        this.oddsDraw = oddsDraw;
    }

    // No-args constructor for JPA
    public LiveMatch() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTeamA() {
        return teamA;
    }

    public void setTeamA(String teamA) {
        this.teamA = teamA;
    }

    public String getTeamB() {
        return teamB;
    }

    public void setTeamB(String teamB) {
        this.teamB = teamB;
    }

    public LocalDateTime getMatchTime() {
        return matchTime;
    }

    public void setMatchTime(LocalDateTime matchTime) {
        this.matchTime = matchTime;
    }

    public MatchStatus getStatus() {
        return status;
    }

    public void setStatus(MatchStatus status) {
        this.status = status;
    }

    public BigDecimal getOddsTeamA() {
        return oddsTeamA;
    }

    public void setOddsTeamA(BigDecimal oddsTeamA) {
        this.oddsTeamA = oddsTeamA;
    }

    public BigDecimal getOddsTeamB() {
        return oddsTeamB;
    }

    public void setOddsTeamB(BigDecimal oddsTeamB) {
        this.oddsTeamB = oddsTeamB;
    }

    public BigDecimal getOddsDraw() {
        return oddsDraw;
    }

    public void setOddsDraw(BigDecimal oddsDraw) {
        this.oddsDraw = oddsDraw;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    // Automatically set timestamps
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = createdAt;
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}*/
