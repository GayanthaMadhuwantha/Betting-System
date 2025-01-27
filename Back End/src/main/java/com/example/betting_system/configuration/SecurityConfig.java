package com.example.betting_system.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(); // Make BCryptPasswordEncoder available as a bean
    }


    // Security filter chain configuration
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf(AbstractHttpConfigurer::disable) // Disable CSRF
                .formLogin(form -> form.disable())
                .httpBasic(AbstractHttpConfigurer::disable) // Disable HTTP Basic authentication
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/api/auth/register", "/api/auth/login", "/api/admin/login","/api/live-matches/**","/api/notices","/api/deposits/**").permitAll() // Allow public access to registration/login
                        .requestMatchers("/api/live-matches","/api/notices", "/api/live-matches/**").hasRole("ADMIN")
                        .anyRequest().authenticated() // Secure all other routes
                );

        return http.build();
    }
}
