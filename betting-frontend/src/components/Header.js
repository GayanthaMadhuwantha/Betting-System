import React from 'react';
import { useNavigate } from "react-router-dom";

const Header = () => {
    const navigate = useNavigate();

    const handleSignUpClick = () => {
        navigate("/register"); // Redirect to the registration form
    };

    return (
        <header className="bg-primary py-3">
            <div className="container d-flex align-items-center justify-content-between">
                {/* Logo */}
                <div className="d-flex align-items-center">
                    <img
                        src="/images/pngegg.png"
                        alt="Betting App Logo"
                        className="me-3"
                        style={{ width: '40px', height: '40px' }}
                    />
                    <h1 className="text-white fs-4 mb-0">Betting App</h1>
                </div>

                {/* Navigation */}
                <nav>
                    <ul className="nav">
                        <li className="nav-item">
                            <a href="/" className="nav-link text-white">
                                Home
                            </a>
                        </li>
                        <li className="nav-item">
                            <a href="/live-matches" className="nav-link text-white">
                                Live Matches
                            </a>
                        </li>
                        <li className="nav-item">
                            <a href="/promotions" className="nav-link text-white">
                                Promotions
                            </a>
                        </li>
                        <li className="nav-item">
                            <a href="/about" className="nav-link text-white">
                                About
                            </a>
                        </li>
                    </ul>
                </nav>

                {/* Login Button */}
                <button className="btn btn-light text-primary fw-bold">Login</button>
                <button className="btn btn-light text-primary fw-bold" onClick={handleSignUpClick}>
                    Sign Up
                </button>
            </div>
        </header>
    );
};

export default Header;
