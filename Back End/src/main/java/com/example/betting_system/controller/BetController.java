package com.example.betting_system.controller;

import com.example.betting_system.model.Bet;
import com.example.betting_system.service.BetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;

@RestController
@RequestMapping("/api/bets")
public class BetController {

    @Autowired
    private BetService betService;

    @PostMapping("/place")
    public ResponseEntity<?> placeBet(
            @RequestParam Long userId,
            @RequestParam Long matchId,
            @RequestParam String betOn,
            @RequestParam BigDecimal betAmount) {
        try {
            Bet bet = betService.placeBet(userId, matchId, betOn, betAmount);
            return ResponseEntity.ok(bet);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
