package com.example.back_end.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.horsebettingbackend.model.User;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByUsername(String username);
    boolean existsByUsername(String username);
}
