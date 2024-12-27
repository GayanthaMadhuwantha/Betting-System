package com.example.back_end.repository;

import com.example.back_end.model.Race;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RaceRepository extends JpaRepository<Race, Long> {

    Race findById(int raceId);

}
