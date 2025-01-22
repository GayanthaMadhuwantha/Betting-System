package com.example.betting_system.service;


import com.example.betting_system.model.Transaction;
import com.example.betting_system.model.User;
import com.example.betting_system.repository.TransactionRepository;
import com.example.betting_system.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
public class TransactionService {

    @Autowired
    private TransactionRepository transactionRepository;

    @Autowired
    private UserRepository userRepository;

    // Deposit funds into user's balance
    public void deposit(Long userId, BigDecimal amount) {
        User user = userRepository.findById(userId).orElseThrow();
        user.setBalance(user.getBalance().add(amount));
        Transaction transaction = new Transaction();
        transaction.setUser(user);
        transaction.setAmount(amount);
        transaction.setType("Deposit");
        transactionRepository.save(transaction);
    }

    // Withdraw funds from user's balance
    public void withdraw(Long userId, BigDecimal amount) {
        User user = userRepository.findById(userId).orElseThrow();
        if (user.getBalance().compareTo(amount) < 0) {
            throw new RuntimeException("Insufficient funds");
        }
        user.setBalance(user.getBalance().subtract(amount));
        Transaction transaction = new Transaction();
        transaction.setUser(user);
        transaction.setAmount(amount);
        transaction.setType("Withdrawal");
        transactionRepository.save(transaction);
    }

    // Get transaction history for a user
    public List<Transaction> getTransactionHistory(Long userId) {
        return transactionRepository.findByUserId(userId);
    }
}
