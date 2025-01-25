package com.example.betting_system.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.Getter;

@Getter
@Data
@Entity
@Table(name = "oogleusers")
public class GoogleUser {

    @Id
    private Long id;
    private String email;
    private boolean emailVerified;
    private String name;


    public GoogleUser(long id, String email, boolean emailVerified, String name, String pictureUrl) {
        this.id = id;
        this.email = email;
        this.emailVerified = emailVerified;
        this.name = name;
        this.pictureUrl = pictureUrl;
    }

    public Long getId() {
        return id;
    }

    public String getEmail() {
        return email;
    }

    public boolean isEmailVerified() {
        return emailVerified;
    }

    public String getName() {
        return name;
    }

    public String getPictureUrl() {
        return pictureUrl;
    }

    public GoogleUser() {

    }

    public void setid(long id) {
        this.id = id;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setEmailVerified(boolean emailVerified) {
        this.emailVerified = emailVerified;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setPictureUrl(String pictureUrl) {
        this.pictureUrl = pictureUrl;
    }

    private String pictureUrl;


    public void setId(Long id) {
        this.id = id;
    }

}
