package com.example.betting_system.controller;

import com.example.betting_system.model.LiveMatch;
import com.example.betting_system.service.LiveMatchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/live-matches")
public class LiveMatchController {

    @Autowired
    private LiveMatchService liveMatchService;

    @PostMapping("/admin/matches")
    @Secured("ROLE_ADMIN")
    @PreAuthorize("hasRole('ADMIN')")// Restricts access to ADMIN role
    public ResponseEntity<LiveMatch> createMatch(@RequestBody LiveMatch liveMatch) {
        return ResponseEntity.ok(liveMatchService.saveLiveMatch(liveMatch));
    }

    /*@DeleteMapping("/{id}")
    @Secured("ROLE_ADMIN")
    public ResponseEntity<LiveMatch> deleteMatch(@PathVariable Long id){
        return ResponseEntity.ok(liveMatchService.deleteLiveMatch(id));
    }*/

    @PutMapping("/admin/matches/{id}")
    @Secured("ROLE_ADMIN")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<LiveMatch> updateMatch(@PathVariable Long id, @RequestBody LiveMatch liveMatch) {
        return ResponseEntity.ok(liveMatchService.updateLiveMatch(id, liveMatch));
    }

    @GetMapping("/{id}")
    public ResponseEntity<LiveMatch> getMatchById(@PathVariable Long id) {
        return ResponseEntity.ok(liveMatchService.getLiveMatchById(id));
    }

    @GetMapping("/ongoing")
    public ResponseEntity<List<LiveMatch>> getLiveMatches() {
        return ResponseEntity.ok(liveMatchService.getOngoingMatches());
    }

    @GetMapping("/all")
    public ResponseEntity<List<LiveMatch>> getAllMatches() {

        return ResponseEntity.ok(liveMatchService.getAllMatches());
    }
}
