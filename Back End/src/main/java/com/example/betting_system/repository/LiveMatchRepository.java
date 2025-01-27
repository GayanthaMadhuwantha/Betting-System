package com.example.betting_system.repository;

import com.example.betting_system.model.LiveMatch;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface LiveMatchRepository extends JpaRepository<LiveMatch, Long> {
   // List<LiveMatch> findByStatusAndMatchTimeIsGreaterThanEqual(String status, LocalDateTime matchTime);

    List<LiveMatch> findByMatchTimeGreaterThanEqual(LocalDateTime currentTime);
}
