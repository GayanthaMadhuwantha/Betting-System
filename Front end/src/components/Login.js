import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';

const Login = ({ setIsLoggedIn }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
    
        try {
            const response = await axios.post('http://localhost:8080/api/auth/login', { username, password });
    
         
    
            if (response.data.token && response.data.user) {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('user', JSON.stringify(response.data.user));
                setIsLoggedIn(true);
                navigate('/dashboard'); // Redirect to dashboard
            } else {
                setErrorMessage('Invalid login response: No token or user data received.');
            }
        } catch (error) {
            setErrorMessage(error.response?.data?.message || 'Login failed. Please try again.');
            
        }
    };

    const handleGoogleLogin = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
          try {
            // Exchange Google access token for your backend token
            const response = await axios.post("http://localhost:8080/api/auth/google", {
              token: tokenResponse.access_token,
            });
    
            // Store token and user info in localStorage
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("user", JSON.stringify(response.data.user));
    
            // Redirect to dashboard
            navigate("/dashboard");
          } catch (error) {
            console.error("Error during Google sign-in:", error);
          }
        },
        onError: (error) => {
          console.error("Google Sign-In Error:", error);
        },
      });
    
    
    

    return (
        <div className="container mt-5">
            <div className="justify-content-center">
                <div className="col-md-5">
                    <div className="">

                        <h3 className="text-center text-primary">Sign In</h3>
                        <p className="text-center text-" style={{fontSize:'15px',color:'red'}}>{errorMessage}</p>
                        <div className="card-body">

                            <form>
                                <div className="mb-3">
                                    <label htmlFor="username" className="form-label">Username</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="username"
                                        placeholder="Enter username"
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        placeholder="Enter password"
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                                <button className="btn btn-primary w-100" onClick={handleLogin}>Login</button>
                                <div className="mb-4">
                                    <h6 className="text-center text-primary mt-2">or</h6>

                                    <button onClick={handleGoogleLogin} className="btn btn-light w-100 d-flex align-items-center justify-content-center">
                                        <img
                                            src="https://upload.wikimedia.org/wikipedia/commons/archive/c/c1/20210618182605%21Google_%22G%22_logo.svg"
                                            alt="Google Logo"
                                            style={{ width: '20px', height: '20px', marginRight: '10px' }}
                                        />
                                        Continue with Google
                                        
                                    </button>
                                    <p className="text-center mt-3">Don't have an account? <a href="/register" className="text-center mt-5" >Sign Up</a></p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
