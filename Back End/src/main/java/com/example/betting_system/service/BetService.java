package com.example.betting_system.service;

import com.example.betting_system.model.Bet;
import com.example.betting_system.model.LiveMatch;
import com.example.betting_system.model.User;
import com.example.betting_system.repository.BetRepository;
import com.example.betting_system.repository.LiveMatchRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.Optional;

@Service
public class BetService {

    @Autowired
    private BetRepository betRepository;

    @Autowired
    private LiveMatchRepository liveMatchRepository;

    public Bet placeBet(Long userId, Long matchId, String betOn, BigDecimal betAmount) throws Exception {
        Optional<LiveMatch> optionalMatch = liveMatchRepository.findById(matchId);

        if (optionalMatch.isEmpty()) {
            throw new Exception("Match not found.");
        }

        LiveMatch liveMatch = optionalMatch.get();

        if (!"ONGOING".equalsIgnoreCase(liveMatch.getStatus())) {
            throw new Exception("You can only place a bet on ongoing matches.");
        }

        BigDecimal odds;
        switch (betOn.toUpperCase()) {
            case "TEAM_A":
                odds = liveMatch.getOddsTeamA();
                break;
            case "TEAM_B":
                odds = liveMatch.getOddsTeamB();
                break;
            case "DRAW":
                odds = liveMatch.getOddsDraw();
                break;
            default:
                throw new Exception("Invalid bet option. Valid options: TEAM_A, TEAM_B, DRAW.");
        }

        Bet bet = new Bet();
        bet.setUser(new User(userId)); // Assume User entity has a constructor for ID
        bet.setLiveMatch(liveMatch);
        bet.setBetOn(betOn);
        bet.setOdds(odds);
        bet.setBetAmount(betAmount);

        return betRepository.save(bet);
    }
}
