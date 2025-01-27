import React, { useState, useEffect } from 'react';
import { Outlet, Link, useNavigate, useLocation, NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FiHome, FiDollarSign, FiUser, FiActivity, FiLogOut, FiMenu, FiX } from 'react-icons/fi';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const DashboardLayout = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [loading, setLoading] = useState(true);
  const [routes] = useState([
    { path: '/dashboard/home', name: 'Home', icon: <FiHome /> },
    { path: '/dashboard/transactions', name: 'Transactions', icon: <FiDollarSign /> },
    { path: '/dashboard/profile', name: 'Profile', icon: <FiUser /> },
    { path: '/betting', name: 'Betting', icon: <FiActivity /> },
  ]);

  useEffect(() => {
    const verifyAuth = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      // Add actual API call to verify token validity here
      // try {
      //   const response = await fetch('/api/verify-token', { headers: { Authorization: token } });
      //   if (!response.ok) navigate('/login');
      // } catch (error) {
      //   navigate('/login');
      // }

      setLoading(false);
    };

    verifyAuth();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn?.(false);
    navigate('/login');
  };

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  if (loading) return <div className="d-flex justify-content-center mt-5">Loading...</div>;

  return (
    <div className="container-fluid">
      {/* Mobile Header */}
      <div className="d-md-none bg-light p-3 d-flex justify-content-between align-items-center">
        <h4 className="mb-0">Dashboard</h4>
        <button 
          className="btn btn-link" 
          onClick={toggleSidebar}
          aria-label="Toggle navigation"
        >
          {sidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      <div className="row">
        {/* Sidebar */}
        <div className={`col-md-3 bg-light vh-100 ${sidebarOpen ? 'd-block' : 'd-none'} d-md-block position-md-fixed`}>
          <div className="d-flex flex-column p-3">
            <h4 className="mb-3 d-none d-md-block">Dashboard</h4>
            <ul className="nav nav-pills flex-column mb-auto">
              {routes.map((route) => (
                <li key={route.path} className="nav-item my-1">
                  <NavLink
                    to={route.path}
                    className={({ isActive }) => 
                      `nav-link d-flex align-items-center ${isActive ? 'active' : ''}`
                    }
                  >
                    {route.icon}
                    <span className="ms-2">{route.name}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
            <hr />
            <button 
              className="btn btn-danger d-flex align-items-center justify-content-center"
              onClick={() => setShowLogoutModal(true)}
            >
              <FiLogOut className="me-2" />
              Logout
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className={`col-md-9 ${!sidebarOpen ? 'offset-md-0' : 'offset-md-3'}`}>
          <div className="p-4">
            <Outlet />
          </div>
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      <Modal show={showLogoutModal} onHide={() => setShowLogoutModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Logout</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to log out?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowLogoutModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleLogout}>
            Logout
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DashboardLayout;