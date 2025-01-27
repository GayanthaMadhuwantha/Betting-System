package com.example.betting_system.model;

import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Data
public class Deposit {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @Enumerated(EnumType.STRING)
    private DepositMethod depositMethod;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public DepositMethod getDepositMethod() {
        return depositMethod;
    }

    public void setDepositMethod(DepositMethod depositMethod) {
        this.depositMethod = depositMethod;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public DepositStatus getStatus() {
        return status;
    }

    public void setStatus(DepositStatus status) {
        this.status = status;
    }

    public String getSlipFilePath() {
        return slipFilePath;
    }

    public void setSlipFilePath(String slipFilePath) {
        this.slipFilePath = slipFilePath;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    private BigDecimal amount;

    @Enumerated(EnumType.STRING)
    private DepositStatus status = DepositStatus.PENDING;

    private String slipFilePath;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    // Enum definitions
    public enum DepositMethod { BANK_TRANSFER, ONLINE_PAYMENT }
    public enum DepositStatus { PENDING, APPROVED, REJECTED }
}