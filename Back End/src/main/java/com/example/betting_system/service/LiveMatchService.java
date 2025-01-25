package com.example.betting_system.service;

import com.example.betting_system.model.LiveMatch;
import com.example.betting_system.repository.LiveMatchRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class LiveMatchService {

    @Autowired
    private LiveMatchRepository liveMatchRepository;

    // Get all live matches with status "ONGOING" and match time before now
    public List<LiveMatch> getOngoingMatches() {
        return liveMatchRepository.findByStatusAndMatchTimeBefore(LiveMatch.MatchStatus.ONGOING, LocalDateTime.now());
    }

    // Save a new live match (create or update)
    public LiveMatch saveLiveMatch(LiveMatch liveMatch) {
        return liveMatchRepository.save(liveMatch);
    }

    // Get all matches (irrespective of status or time)
    public List<LiveMatch> getAllMatches() {
        return liveMatchRepository.findAll();
    }

    // Get a specific match by ID
    public LiveMatch getLiveMatchById(Long id) {
        return liveMatchRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Live match with ID " + id + " not found"));
    }

    // Update an existing live match
    public LiveMatch updateLiveMatch(Long id, LiveMatch updatedMatch) {
        LiveMatch match = liveMatchRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Live match with ID " + id + " not found"));

        match.setTeamA(updatedMatch.getTeamA());
        match.setTeamB(updatedMatch.getTeamB());
        match.setMatchTime(updatedMatch.getMatchTime());
        match.setStatus(updatedMatch.getStatus());
        match.setOddsTeamA(updatedMatch.getOddsTeamA());
        match.setOddsTeamB(updatedMatch.getOddsTeamB());
        match.setOddsDraw(updatedMatch.getOddsDraw());

        return liveMatchRepository.save(match);
    }

    // Delete a live match by ID
    public void deleteLiveMatch(Long id) {
        if (!liveMatchRepository.existsById(id)) {
            throw new EntityNotFoundException("Live match with ID " + id + " not found");
        }
        liveMatchRepository.deleteById(id);
    }
}
