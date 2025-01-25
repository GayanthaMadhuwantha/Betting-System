package com.example.betting_system.controller;

import com.example.betting_system.model.User;
import com.example.betting_system.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/admin")
public class AdminAuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<?> adminLogin(@RequestBody User user) {
        try {
            User existingUser = authService.findByUsername(user.getUsername());

            // Ensure the user has an ADMIN role
            if (!existingUser.getRole().equals(User.Role.ADMIN)) {
                throw new Exception("Access denied: Not an admin");
            }

            // Validate password and generate token
            String token = authService.login(user);

            return ResponseEntity.ok().body(Map.of(
                    "token", token,
                    "user", user
            ));
        } catch (Exception e) {
            System.out.println(("Login error: {}" + e.getMessage()));
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Login failed: " + e.getMessage());
        }
    }


}

