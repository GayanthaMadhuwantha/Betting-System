package com.example.back_end.repository;

import com.example.back_end.model.Bet;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BetRepository extends JpaRepository<Bet, Long> {
    List<Bet> findByUserId(Long userId);

    List<Bet> findByHorseRaceId(Long raceId);
}

