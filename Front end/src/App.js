import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from 'axios';
import { useNavigate,Link } from "react-router-dom";
import Login from "./components/Login";
import HomePage from './pages/HomePage';
import Header from './components/Header';
import Register from './components/Register'; 
import Dashboard from './components/Dashboard';
import Terms from './components/Terms';

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
          <div className="col-md-6 text-center">
             
          </div>
          <Routes>
              <Route path="/" element={<HomePage setIsLoggedIn={setIsLoggedIn} />} />
              <Route path="/register" element={<Register setIsLoggedIn={setIsLoggedIn} />} />
              <Route path="/dashboard" element={<Dashboard setIsLoggedIn={setIsLoggedIn} />} />
              <Route path="/login" element={<Login  setIsLoggedIn={setIsLoggedIn}/>} />
              <Route path="/terms" element={<Terms />} />
              <Route path="*" element={<div className='text-center fs-2 text-primary mt-5'>404 - Page Not Found</div>} />
          </Routes>
      </Router>
  );
}

export default App;