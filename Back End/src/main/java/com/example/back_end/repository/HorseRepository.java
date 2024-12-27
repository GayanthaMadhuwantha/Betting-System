package com.example.back_end.repository;

import com.example.back_end.model.Horse;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface HorseRepository extends JpaRepository<Horse,Long> {
    Horse findById(int horseId);
    List<Horse> findByAvailableForBettingTrue();
}
