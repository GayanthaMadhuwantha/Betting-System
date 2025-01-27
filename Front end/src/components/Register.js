import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';

const Register = ({ setIsLoggedIn }) => {
    const [form, setForm] = useState({
        username: '',
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState({});
    const [passwordStrength, setPasswordStrength] = useState(0);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setPasswordStrength(calculateStrength(form.password));
    }, [form.password]);

    const calculateStrength = (password) => {
        let strength = 0;
        if (password.length >= 8) strength += 1;
        if (password.match(/[A-Z]/)) strength += 1;
        if (password.match(/[0-9]/)) strength += 1;
        if (password.match(/[^A-Za-z0-9]/)) strength += 1;
        return strength;
    };

    const validate = () => {
        const errors = {};
        if (!form.username) errors.username = 'Username is required';
        if (!form.email) {
            errors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(form.email)) {
            errors.email = 'Email is invalid';
        }
        if (!form.password) errors.password = 'Password is required';
        return errors;
    };

    const validateEmail=()=>{
        if (!/\S+@\S+\.\S+/.test(form.email)) {
            errors.email = 'Email is invalid';
        }

    }


      
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

    const handleRegister = async (e) => {
        e.preventDefault(); // Prevent default form submission

        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            const response = await axios.post('http://localhost:8080/api/auth/register', {
                username: form.username,
                email: form.email,
                password: form.password
            });
            localStorage.setItem('token', response.data.token); // Save token in localStorage
            setIsLoggedIn(true); // Update authentication state
            navigate('/dashboard'); // Redirect after registration
        } catch (error) {
            console.error("Registration failed", error);
        }
    };

    return (
        <div className="container mt-5">
            <div className="justify-content-center">
                <div className="col-md-5">
                    <div className="">

                        <h3 className="text-center text-primary">Sign Up</h3>

                        <div className="card-body">
                            <div className="mb-3">
                                <label className="form-label">Username</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter your username"
                                    onChange={(e) => setForm({ ...form, username: e.target.value })}
                                />
                                {errors.username && <div className="text-danger">{errors.username}</div>}
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Email</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    placeholder="Enter your email"
                                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                                    
                                />
                                {errors.email && <div className="text-danger">{errors.email}</div>}
                            </div>
                            <div className="mb-3">
                            
                                <label className="form-label">Password</label>
                                <div className="input-group"><input
                                    type="password"
                                    className="form-control"
                                    placeholder="Enter your password"
                                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                                />
                                <button
                                            type="button"
                                            className="btn btn-outline-secondary"
                                            
                                            aria-label="Toggle password visibility"
                                        >
                                            {showPassword ? (
                                                <i className="bi bi-eye-slash"></i>
                                            ) : (
                                                <i className="bi bi-eye"></i>
                                            )}
                                        </button></div>
                                <div className="progress mt-2" style={{ height: "5px" }}>
                                            <div 
                                                className={`progress-bar ${
                                                    passwordStrength === 0 ? 'bg-danger' :
                                                    passwordStrength < 3 ? 'bg-warning' : 'bg-success'
                                                }`} 
                                                role="progressbar" 
                                                style={{ width: `${(passwordStrength/4)*100}%` }}
                                                aria-valuenow={passwordStrength}
                                                aria-valuemin="0"
                                                aria-valuemax="4"
                                            />
                                        </div>
                                 <small className="text-muted">
                                            Password strength: {['Weak', 'Fair', 'Good', 'Strong'][passwordStrength - 1] || 'Very Weak'}
                                        </small>
                                {errors.password && <div className="text-danger">{errors.password}</div>}
                            </div>
                            <div class="form-check mt-2">
                                <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" required />
                                <label class="" >
                                    By signing up, you agree to our <a href='/terms'>Terms & Conditions</a>.
                                </label>
                            </div>

                            <button className="btn btn-primary w-100 just mt-2" onClick={handleRegister}>Register</button>

                            <div className="mb-3">
                                <h6 className="text-center text-primary">or</h6>

                                <button onClick={() => handleGoogleLogin()} className="btn btn-light w-100 d-flex align-items-center justify-content-center">
                                    <img
                                        src="https://upload.wikimedia.org/wikipedia/commons/archive/c/c1/20210618182605%21Google_%22G%22_logo.svg"
                                        alt="Google Logo"
                                        style={{ width: '20px', height: '20px', marginRight: '10px' }}
                                    />
                                    Continue with Google
                                </button>


                                <p className="text-center mt-3">Already have an account? <a href="/login">Login</a></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
