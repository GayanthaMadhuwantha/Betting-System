package com.example.back_end.service;

import com.example.back_end.model.UserLoginDTO;
import com.example.back_end.model.UserRegistrationDTO;
import com.example.back_end.repository.UserRepository;
import com.example.horsebettingbackend.model.User;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public String register(UserRegistrationDTO dto) {
        if (userRepository.existsByUsername(dto.getUsername())) {
            return "Username already exists";
        }
        User user = new User();
        user.setUsername(dto.getUsername());
        user.setPassword(passwordEncoder.encode(dto.getPassword()));
        user.setEmail(dto.getEmail());
        user.setFullName(dto.getFullName());

        userRepository.save(user);
        return "User registered successfully";
    }

    public boolean login(UserLoginDTO dto) {
        User user = userRepository.findByUsername(dto.getUsername());
        return user != null && passwordEncoder.matches(dto.getPassword(), user.getPassword());
    }

    public User getProfile(String username) {
       return userRepository.findByUsername(username);
    }
}

