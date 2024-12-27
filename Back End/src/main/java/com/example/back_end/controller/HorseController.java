package com.example.back_end.controller;


import com.example.back_end.model.Horse;
import com.example.back_end.service.HorseService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/horses")
public class HorseController {

    private final HorseService horseService;

    public HorseController(HorseService horseService) {
        this.horseService = horseService;
    }

    // Retrieve all horses available for betting
    @GetMapping("/available")
    public ResponseEntity<List<Horse>> getAvailableHorses() {
        List<Horse> horses = horseService.getAvailableHorses();
        return ResponseEntity.ok(horses);
    }

    // Add a new horse
    @PostMapping("/add")
    public ResponseEntity<Horse> addHorse(@RequestBody Horse horse) {
        Horse savedHorse = horseService.addHorse(horse);
        return ResponseEntity.ok(savedHorse);
    }

    // Update horse odds
    @PutMapping("/{horseId}/update-odds")
    public ResponseEntity<Horse> updateHorseOdds(@PathVariable Long horseId, @RequestParam Double odds) {
        Horse updatedHorse = horseService.updateHorseOdds(horseId, odds);
        return ResponseEntity.ok(updatedHorse);
    }

    // Update horse availability for betting
    @PutMapping("/{horseId}/availability")
    public ResponseEntity<Horse> updateHorseAvailability(@PathVariable Long horseId, @RequestParam boolean isAvailable) {
        Horse updatedHorse = horseService.updateHorseAvailability(horseId, isAvailable);
        return ResponseEntity.ok(updatedHorse);
    }

    // Delete a horse
    @DeleteMapping("/{horseId}/delete")
    public ResponseEntity<String> deleteHorse(@PathVariable Long horseId) {
        horseService.deleteHorse(horseId);
        return ResponseEntity.ok("Horse deleted successfully!");
    }
}
