package com.example.betting_system.repository;

import com.example.betting_system.model.LiveMatch;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface LiveMatchRepository extends JpaRepository<LiveMatch, Long> {
    List<LiveMatch> findByStatusAndMatchTimeBefore(LiveMatch.MatchStatus status, LocalDateTime time);
}