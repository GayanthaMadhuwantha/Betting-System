import React from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';

const GoogleSignUp = () => {
  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        console.log('Google token:', tokenResponse);
        
        // Send token to your backend for verification
        const backendResponse = await axios.post('http://localhost:8080/api/auth/google-signup', {
          token: tokenResponse.access_token,
        });

        console.log('Backend response:', backendResponse.data);
        // Save user data/token and redirect if needed
      } catch (error) {
        console.error('Error during Google signup:', error);
      }
    },
    onError: (error) => {
      console.error('Google Login Failed:', error);
    },
  });

  return (
    <button onClick={() => handleGoogleLogin()} className="btn btn-primary">
      Sign Up with Google
    </button>
  );
};

export default GoogleSignUp;
