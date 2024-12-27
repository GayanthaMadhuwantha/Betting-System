package com.example.back_end.service;


import com.example.back_end.model.Bet;
import com.example.back_end.model.Horse;
import com.example.back_end.model.Race;
import com.example.back_end.repository.BetRepository;
import com.example.back_end.repository.HorseRepository;
import com.example.back_end.repository.RaceRepository;
import com.example.back_end.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class BetService {

    private final BetRepository betRepository;
    private final HorseRepository horseRepository;

    private RaceRepository raceRepository;
    private UserRepository userRepository;

    public BetService(BetRepository betRepository, UserRepository userRepository, HorseRepository horseRepository) {
        this.betRepository = betRepository;
        this.userRepository = userRepository;
        this.horseRepository = horseRepository;
    }

    public Bet placeBet(Long userId, Long horseId, Double amount) {



        com.example.horsebettingbackend.model.User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        if (user.getWalletBalance() < amount) {
            throw new IllegalArgumentException("Insufficient wallet balance");
        }
        user.setWalletBalance(user.getWalletBalance() - amount);


        Horse horse = horseRepository.findById(horseId).orElseThrow(() -> new IllegalArgumentException("Horse not found"));
        if (horse.getRace().getStartTime().isBefore(LocalDateTime.now())) {
            throw new IllegalArgumentException("Cannot place bets after race start");
        }

        // Calculate potential winnings based on horse odds
        Double potentialWinnings = amount * horse.getOdds();

        Bet bet = new Bet();
        bet.setUser(user);
        bet.setHorse(horse);
        bet.setAmount(amount);
        bet.setPotentialWinnings(potentialWinnings);
        bet.setWinningBet(false);
        bet.setPlacedAt(LocalDateTime.now());

        return betRepository.save(bet);


    }

    public List<Bet> getBetsByUser(Long userId) {
        return betRepository.findByUserId(userId);
    }
    public void processRaceResults(Long raceId, Long winningHorseId) {
        List<Bet> bets = betRepository.findByHorseRaceId(raceId);

        for (Bet bet : bets) {
            if (bet.getHorse().getId().equals(winningHorseId)) {
                bet.setWinningBet(true);
                com.example.horsebettingbackend.model.User user = bet.getUser();
                user.setWalletBalance(user.getWalletBalance() + bet.getPotentialWinnings());
                userRepository.save(user);
            }
        }

        // Mark the race as completed
        Race race = raceRepository.findById(raceId)
                .orElseThrow(() -> new IllegalArgumentException("Race not found"));
        race.setCompleted(true);
        race.setWinningHorseId(winningHorseId);
        raceRepository.save(race);
    }

}

