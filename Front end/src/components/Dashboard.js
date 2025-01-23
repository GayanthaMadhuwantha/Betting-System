import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const DashboardLayout = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/login');
  };

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Sidebar */}
        <div className="col-md-3 bg-light vh-100">
          <div className="d-flex flex-column p-3">
            <h4 className="mb-3">Dashboard</h4>
            <ul className="nav nav-pills flex-column mb-auto">
              <li>
                <Link to="/dashboard/home" className="nav-link">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/dashboard/transactions" className="nav-link">
                  Transactions
                </Link>
              </li>
              <li>
                <Link to="/dashboard/profile" className="nav-link">
                  Profile
                </Link>
              </li>
            </ul>
            <hr />
            <button className="btn btn-danger" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="col-md-9">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
