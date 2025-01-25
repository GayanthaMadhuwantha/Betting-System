import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Picture from './Picture';

const AdminLogin = ({ setIsLoggedIn }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const validateForm = () => {
        if (!username || !password) {
            setError('Both fields are required.');
            return false;
        }
        return true;
    };

    const handleAdminLogin = async (e) => {
        e.preventDefault();
        if (!validateForm()) {
            return;
        }
        try {
            const response = await axios.post('http://localhost:8080/api/admin/login', {
                username,
                password
            });

            const { token, user } = response.data;

            // Store the token in localStorage
            localStorage.setItem('adminToken', token);
            localStorage.setItem('data',user.data)
            setIsLoggedIn(true);
            // Redirect to admin dashboard
            navigate('/admin/dashboard');
        } catch (err) {
            setError('Invalid credentials. Please try again.');
        }
    };

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-5">
                    <div className="">
                        <div className="">
                            <h2 className="text-center">Admin Login</h2>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleAdminLogin}>
                                <div className="form-group">
                                    <label htmlFor="username">Username</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="username"
                                        placeholder="Enter username"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                </div>
                                <div className="form-group mt-3">
                                    <label htmlFor="password">Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        placeholder="Enter password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                             
                               

                                <button className="btn btn-primary w-100 mt-4" >Login</button>{error && <p className="text-danger mt-2">{error}</p>}
                                <div className="mb-3 mt-3 ">
                                <div className="mb-3">
                                    <h6 className="text-center text-primary mt-2">or</h6>

                                    <button className="btn btn-light w-100 d-flex align-items-center justify-content-center">
                                        <img
                                            src="https://upload.wikimedia.org/wikipedia/commons/archive/c/c1/20210618182605%21Google_%22G%22_logo.svg"
                                            alt="Google Logo"
                                            style={{ width: '20px', height: '20px', marginRight: '10px' }}
                                        />
                                        Continue with Google
                                    </button>
                                    <h6 className="text-center text-primary mt-2"><a href='/foget-password'>Foget Password</a></h6>
                                </div>
</div>
{Picture}


                            </form>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    );

};

export default AdminLogin;
