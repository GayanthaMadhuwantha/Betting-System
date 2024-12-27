package com.example.back_end.model;


import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "horses")
public class Horse {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private Double odds;
    private boolean availableForBetting;

    @ManyToOne
    @JoinColumn(name = "race_id", nullable = false)
    private Race race;
}

