package com.example.betting_system.controller;

import com.example.betting_system.model.Transaction;
import com.example.betting_system.model.User;
import com.example.betting_system.repository.UserRepository;
import com.example.betting_system.service.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TransactionService transactionService;

    // Get user profile
    @GetMapping("/profile")
    public ResponseEntity<User> getProfile(Authentication authentication) {
        String username = authentication.getName();
        User user = userRepository.findByUsername(username).orElseThrow();
        return ResponseEntity.ok(user);
    }

    // Get transaction history
    @GetMapping("/transactions")
    public ResponseEntity<List<Transaction>> getTransactionHistory(Authentication authentication) {
        String username = authentication.getName();
        User user = userRepository.findByUsername(username).orElseThrow();
        List<Transaction> transactions = transactionService.getTransactionHistory(user.getId());
        return ResponseEntity.ok(transactions);
    }
}
