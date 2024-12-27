import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";


import HomePage from './pages/HomePage'
import Header from './components/Header'

function App() {
  return (

      <Router>
          <Header />
          <div className="col-md-6 text-center">
              <img
                  src="/images/pngegg.png"
                  alt="Betting Website"
                  className="img-fluid"
              />
          </div>
          <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              {/* Add other routes here */}
          </Routes>
      </Router>
  );
}

export default App;