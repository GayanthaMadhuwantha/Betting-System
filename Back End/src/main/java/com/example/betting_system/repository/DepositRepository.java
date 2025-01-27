package com.example.betting_system.repository;

import com.example.betting_system.model.Deposit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DepositRepository extends JpaRepository<Deposit,Long> {
    List<Deposit> findByStatus(Deposit.DepositStatus depositStatus);

    List<Deposit> findByUserId(Long userId);
        
    
}
