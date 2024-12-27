package com.example.back_end.service;

import com.example.back_end.model.Horse;
import com.example.back_end.repository.HorseRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HorseService {

    private final HorseRepository horseRepository;

    public HorseService(HorseRepository horseRepository) {
        this.horseRepository = horseRepository;
    }

    public List<Horse> getAvailableHorses() {
        return horseRepository.findByAvailableForBettingTrue();
    }

    public Horse updateHorseAvailability(Long horseId, boolean isAvailable) {
        Horse horse = horseRepository.findById(horseId)
                .orElseThrow(() -> new IllegalArgumentException("Horse not found"));
        horse.setAvailableForBetting(isAvailable);
        return horseRepository.save(horse);
    }

    public Horse addHorse(Horse horse) {
        return horseRepository.save(horse);
    }

    public Horse updateHorseOdds(Long horseId, Double odds) {
        Horse horse = horseRepository.findById(horseId)
                .orElseThrow(() -> new IllegalArgumentException("Horse not found"));
        horse.setOdds(odds);
        return horseRepository.save(horse);
    }

    public void deleteHorse(Long horseId) {
        if (!horseRepository.existsById(horseId)) {
            throw new IllegalArgumentException("Horse not found");
        }
        horseRepository.deleteById(horseId);
    }
}

