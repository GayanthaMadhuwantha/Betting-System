package com.example.betting_system.controller;

import com.example.betting_system.model.Deposit;
import com.example.betting_system.service.DepositService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/deposits")
public class DepositController {



    @Autowired
    private DepositService depositService;

    @GetMapping("/test")
    public ResponseEntity<String> testEndpoint() {
        return ResponseEntity.ok("Test endpoint is working!");
    }


    // User creates deposit
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> createDeposit(
            @RequestParam Long userId,
            @RequestParam Deposit.DepositMethod depositMethod,
            @RequestParam BigDecimal amount,
            @RequestParam(required = false) MultipartFile slipFile) throws IOException {

        depositService.createDeposit(userId, depositMethod, amount, slipFile);
        return ResponseEntity.ok().build();
    }

    // Admin gets all pending deposits
    @GetMapping("/pending")
    public List<Deposit> getPendingDeposits() {
        return depositService.getPendingDeposits();
    }

    // Admin approves deposit
    @PatchMapping("/{id}/approve")
    public ResponseEntity<?> approveDeposit(@PathVariable Long id) {
        depositService.approveDeposit(id);
        return ResponseEntity.ok().build();
    }


    @GetMapping("/user/{userId}")
    public List<Deposit> getDepositsByUserId(@PathVariable Long userId) {
        return depositService.getDepositsByUserId(userId);
    }
}
