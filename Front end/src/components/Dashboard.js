import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const Dashboard = ({ setIsLoggedIn }) => {
  const [user, setUser] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(true);
  const [amount, setAmount] = useState('');
  const [transactionType, setTransactionType] = useState('deposit');
  const [transactionStatus, setTransactionStatus] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = '/login';
      return;
    }

    // Fetch user info and transactions
    const fetchUserData = async () => {
      try {
        const userResponse = await axios.get('/api/user/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(userResponse.data);
        setBalance(userResponse.data.balance);

        const transactionsResponse = await axios.get('/api/transactions', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTransactions(transactionsResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleTransaction = async () => {
    const token = localStorage.getItem('token');
    if (!token || !amount) return;

    try {
      const response = await axios.post(
        `/api/transactions/${transactionType}`,
        { amount },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTransactionStatus(`${transactionType.charAt(0).toUpperCase() + transactionType.slice(1)} successful.`);
      setAmount('');
    } catch (error) {
      setTransactionStatus('Transaction failed.');
      console.error(error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
<div className="container">
  <div className="row">
  <div className="col-md-3">
    <div className="d-flex flex-column flex-shrink-0 p-3 bg-light" style={{ width: '280px' }}>
    <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
      <svg className="bi me-2" width="40" height="32"></svg>
      <span className="fs-4">Dashboard</span>
    </a>
    <hr />
    <ul className="nav nav-pills flex-column mb-auto">
      <li className="nav-item">
      <a href="#" className="nav-link active" aria-current="page" onClick={() => setActivePanel('home')}>
        <svg className="bi me-2" width="16" height="16"></svg>
        Home
      </a>
      </li>
      <li>
      <a href="#" className="nav-link link-dark" onClick={() => setActivePanel('dashboard')}>
        <svg className="bi me-2" width="16" height="16"></svg>
        Dashboard
      </a>
      </li>
      <li>
      <a href="#" className="nav-link link-dark" onClick={() => setActivePanel('orders')}>
        <svg className="bi me-2" width="16" height="16"></svg>
        Orders
      </a>
      </li>
      <li>
      <a href="#" className="nav-link link-dark" onClick={() => setActivePanel('products')}>
        <svg className="bi me-2" width="16" height="16"></svg>
        Products
      </a>
      </li>
      <li>
      <a href="#" className="nav-link link-dark" onClick={() => setActivePanel('customers')}>
        <svg className="bi me-2" width="16" height="16"></svg>
        Customers
      </a>
      </li>
    </ul>
    <hr />
    <div className="dropdown">
      <a href="#" className="d-flex align-items-center link-dark text-decoration-none dropdown-toggle" id="dropdownUser2" data-bs-toggle="dropdown" aria-expanded="false">
      <img src="https://github.com/mdo.png" alt="" width="32" height="32" className="rounded-circle me-2" />
      <strong>mdo</strong>
      </a>
      <ul className="dropdown-menu text-small shadow" aria-labelledby="dropdownUser2">
      <li><a className="dropdown-item" href="#">New project...</a></li>
      <li><a className="dropdown-item" href="#">Settings</a></li>
      <li><a className="dropdown-item" href="#">Profile</a></li>
      <li><hr className="dropdown-divider" /></li>
      <li><a className="dropdown-item" href="#" onClick={handleLogout}>Sign out</a></li>
      </ul>
    </div>
    </div>
  </div>
  <div className="col-md-9">
    {activePanel === 'home' && <div>Home Content</div>}
    {activePanel === 'dashboard' && <div>Dashboard Content</div>}
    {activePanel === 'orders' && <div>Orders Content</div>}
    {activePanel === 'products' && <div>Products Content</div>}
    {activePanel === 'customers' && <div>Customers Content</div>}
  </div>
  </div>
</div>
  )
const [activePanel, setActivePanel] = useState('home');
};
export default Dashboard;