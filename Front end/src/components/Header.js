import React,{ useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";

const Header = ({ isLoggedIn, handleLogout }) => {

    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (isLoggedIn) {
            // Simulate fetching user info from an API or local storage
            const storedUser = JSON.parse(localStorage.getItem('user')); // Assuming user data is saved in localStorage
            if (storedUser) {
                setUser(storedUser);
            }
        }
    }, [isLoggedIn]);

    

    const handleSignUpClick = () => {
        navigate("/register"); // Redirect to the registration form
    };

    const handleLoginClick = () => {
        navigate("/login"); // Redirect to the login form
    };

    return (
        <header className="bg-primary py-3">
            <div className="container d-flex align-items-center justify-content-between flex-wrap">
                {/* Logo */}
                <div className="d-flex align-items-center mb-2 mb-md-0">
                    <img
                        src="/images/pngegg.png"
                        alt="Betting App Logo"
                        className="me-3"
                        style={{ width: '40px', height: '40px' }}
                    />
                    <h1 className="text-white fs-4 mb-0" ><a href="/" className="nav-link text-white">Betting App</a></h1>
                </div>

                {/* Navigation */}
                <nav className="mb-2 mb-md-0">
                    <ul className="nav flex-column flex-md-row">
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

                {!isLoggedIn ? (
                    <div className="d-flex">
                        <button className="btn btn-light text-primary fw-bold me-2" onClick={handleLoginClick}>Login</button>
                        <button className="btn btn-light text-primary fw-bold" onClick={handleSignUpClick}>Sign Up</button>
                    </div>
                ) : (
                    <><h5 className="text-white fw-bold m" >
                                Balnce {user?.balance || '0.00'}
                            </h5><h5 className="text-white" onClick={handleLogout}>
                            Hi {user?.username || 'User'}
                        </h5></>
                )}
            </div>
        </header>
    );
};

export default Header;
