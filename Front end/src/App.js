import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import HomePage from './pages/HomePage';
import Header from './components/Header';
import Footer from './components/Footer';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import Terms from './components/Terms';
import Home from './components/Home';
import About from './components/About';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import LiveMatches from './components/LiveMatches';
import MatchForm from './components/MatchForm';
import NoticeManager from './components/NoticeManager';
import CookieConsent from "react-cookie-consent";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem('token'); // Assuming you store the JWT in localStorage after login
    if (token) {
      setIsLoggedIn(true);

    }
  }, []);

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    window.location.href = '/login';

  };
  return (

    <Router>
      <Header isLoggedIn={isLoggedIn} handleLogout={handleLogout} />

      <Routes>
        <Route path="/" element={<HomePage setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/register" element={<Register setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/dashboard/home" element={<Home setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/about" element={<About />} />
        <Route path="/admin/login" element={<AdminLogin setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/admin/dashboard" element={<AdminDashboard setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/live-matches" element={<LiveMatches />} />
        <Route path="/admin/matches" element={<MatchForm setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/notices" element={<NoticeManager isAdmin={true} setIsLoggedIn={setIsLoggedIn} />} />
      
        <Route path="*" element={<div className='text-center fs-2 text-primary mt-5'>404 - Page Not Found</div>} />
      </Routes>
      <CookieConsent
                location="bottom"
                buttonText="I accept"
                declineButtonText="I decline"
                onAccept={() => {
                    console.log("Cookies accepted");
                }}
                onDecline={() => {
                    console.log("Cookies declined");
                }}
                cookieName="myAwesomeCookieName"
                style={{ background: "#2B373B" }}
                buttonStyle={{ color: "#4e503b", fontSize: "13px" }}
                declineButtonStyle={{ color: "#fff", fontSize: "13px" }}
            >
                This website uses cookies to enhance the user experience.
            </CookieConsent>
      <Footer />
    </Router>
  );
}

export default App;