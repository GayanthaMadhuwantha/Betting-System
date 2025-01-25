package com.example.betting_system.controller;

import com.example.betting_system.configuration.GoogleTokenVerifier;
import com.example.betting_system.configuration.JwtTokenUtil;
import com.example.betting_system.model.GoogleUser;
import com.example.betting_system.model.User;
import com.example.betting_system.repository.UserRepository;
import com.example.betting_system.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigDecimal;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @Autowired
    private GoogleTokenVerifier googleTokenVerifier;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        try {
            User newUser = authService.register(user);
            return ResponseEntity.ok(newUser);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {
        try {
            User existingUser = authService.findByUsername(user.getUsername());

            // Ensure the user has a Standared role
            if (!existingUser.getRole().equals(User.Role.USER)) {
                throw new Exception("Access denied: Not an a USER");
            }
            String token = authService.login(user);
            // Example response with user details and token
            return ResponseEntity.ok().body(Map.of(
                    "token", token,
                    "user", user
            ));
        } catch (Exception e) {
            System.out.println(("Login error: {}"+ e.getMessage()));
            return ResponseEntity.badRequest().body("Login failed: " + e.getMessage());
        }
    }


    @PostMapping("/google")
    public ResponseEntity<?> googleSignIn(@RequestBody Map<String, String> request) {
        String idToken = request.get("token");
        try {
            GoogleUser googleUser = googleTokenVerifier.verifyToken(idToken);

            // Check if the user exists in your database
            User user = userRepository.findByEmail(googleUser.getEmail())
                    .orElseGet(() -> {
                        // Register the user if they do not exist
                        User newUser = new User();
                        newUser.setEmail(googleUser.getEmail());
                        newUser.setUsername(googleUser.getName());
                        newUser.setBalance(BigDecimal.ZERO);
                        userRepository.save(newUser);
                        return newUser;
                    });

            // Generate a JWT token for your app
            String token = jwtTokenUtil.generateToken(user);

            return ResponseEntity.ok(Map.of("token", token, "user", user));
        } catch (Exception e) {
            System.out.println(("Login error: {}" + e.getMessage()));
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid Google token");
        }
    }



}



