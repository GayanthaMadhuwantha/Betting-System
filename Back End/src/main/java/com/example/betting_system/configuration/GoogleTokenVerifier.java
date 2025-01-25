package com.example.betting_system.configuration;

import com.example.betting_system.model.GoogleUser;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.jackson2.JacksonFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Collections;

@Component
public class GoogleTokenVerifier {
    @Value("${google.clientId}")
    private String CLIENT_ID; // Replace with your Google Client ID
    private final GoogleIdTokenVerifier verifier;

    public GoogleTokenVerifier() {
        JsonFactory jsonFactory = JacksonFactory.getDefaultInstance();
        verifier = new GoogleIdTokenVerifier.Builder(new NetHttpTransport(), jsonFactory)
                .setAudience(Collections.singletonList(CLIENT_ID)) // Validate the token against your Client ID
                .build();
    }

    public GoogleUser verifyToken(String idTokenString) throws Exception {
        GoogleIdToken idToken = verifier.verify(idTokenString);
        if (idToken == null) {
            throw new Exception("Invalid ID token");
        }

        GoogleIdToken.Payload payload = idToken.getPayload();

        // Extract user details
        long id = Long.parseLong(payload.getSubject());
        String email = payload.getEmail();
        boolean emailVerified = payload.getEmailVerified();
        String name = (String) payload.get("name");
        String pictureUrl = (String) payload.get("picture");

        return new GoogleUser(id, email, emailVerified, name, pictureUrl);
    }
}
