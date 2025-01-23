package com.example.betting_system.service;

import com.example.betting_system.configuration.JwtTokenUtil;
import com.example.betting_system.model.User;
import com.example.betting_system.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {


    @Autowired
    private UserRepository userRepository;

/*@Autowired
    public BCryptPasswordEncoder passwordEncoder;*/

    @Autowired
    private JwtTokenUtil jwtTokenUtil;



    public User register(User user) {
        user.setPassword(new BCryptPasswordEncoder().encode(user.getPassword()));
        return userRepository.save(user);
    }
    public String login(User user) throws Exception {
        // Check if the user exists
        User existingUser = userRepository.findByUsername(user.getUsername())
                .orElseThrow(() -> new Exception("User not found"));

        // Validate password (use BCryptPasswordEncoder to check the hashed password)
        if (!new BCryptPasswordEncoder().matches(user.getPassword(), existingUser.getPassword())) {
            throw new Exception("Invalid credentials");
        }

        // Generate JWT token
        return jwtTokenUtil.generateToken(existingUser);
    }

    public User findByUsername(String username) throws Exception {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new Exception("User not found"));
    }
}
