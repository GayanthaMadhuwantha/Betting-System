package com.example.back_end.controller;


import com.example.back_end.model.Bet;
import com.example.back_end.service.BetService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bets")
public class BetController {

    private final BetService betService;

    public BetController(BetService betService) {
        this.betService = betService;
    }

    @PostMapping("/place")
    public ResponseEntity<String> placeBet(@RequestParam Long userId,
                                           @RequestParam Long horseId,
                                           @RequestParam Double amount) {
        try {
            Bet bet = betService.placeBet(userId, horseId, amount);
            return ResponseEntity.ok("Bet placed successfully!");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }


    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Bet>> getBetsByUser(@PathVariable Long userId) {
        List<Bet> bets = betService.getBetsByUser(userId);
        return ResponseEntity.ok(bets);
    }
}
