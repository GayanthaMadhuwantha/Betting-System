package com.example.betting_system.model;

import com.example.betting_system.model.LiveMatch;
import com.example.betting_system.model.LiveMatch.MatchStatus;
import com.example.betting_system.repository.LiveMatchRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;

@Component
public class MatchScheduler {

    @Autowired
    private LiveMatchRepository liveMatchRepository;

    @Scheduled(fixedRate = 60000) // Run every minute
    public void updateMatchStatuses() {
        // Fetch only matches that need status updates
        List<LiveMatch> scheduledMatches = liveMatchRepository.findByStatusAndMatchTimeBefore(MatchStatus.SCHEDULED, LocalDateTime.now());

        // Update status to ONGOING
        scheduledMatches.forEach(match -> {
            match.setStatus(MatchStatus.ONGOING);
            liveMatchRepository.save(match);
        });
    }
}
