import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const DepositForm = ({ setIsLoggedIn }) => {
    const [method, setMethod] = useState('BANK_TRANSFER');
    const [amount, setAmount] = useState('');
    const [slipFile, setSlipFile] = useState(null);
    const [deposits, setDeposits] = useState([]);
    const [isPopupVisible, setPopupVisible] = useState(false);
    const [selectedDeposit, setSelectedDeposit] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const userId = JSON.parse(localStorage.getItem('user')).id;

    // Authorization config
    const getAuthConfig = () => ({
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    });

    // Fetch user deposits
    const fetchDeposits = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`http://localhost:8080/api/deposits/user/${userId}`,
                getAuthConfig()
            );
            setDeposits(response.data);
        } catch (error) {
            //setError('Failed to fetch deposits');
            console.error("Error fetching deposits:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
            return;
        }
        if(userId==null){
            navigate('/login');
        }
        
        setIsLoggedIn(true);
        fetchDeposits();
    }, [userId, navigate, setIsLoggedIn]);

    // Handle file validation
    const validateFile = (file) => {
        if (!file) return false;
        
        const validTypes = ['image/jpeg', 'image/png', 'application/pdf'];
        const maxSize = 5 * 1024 * 1024; // 5MB

        if (!validTypes.includes(file.type)) {
            alert('Invalid file type. Please upload JPEG, PNG, or PDF.');
            return false;
        }

        if (file.size > maxSize) {
            alert('File size exceeds 5MB limit');
            return false;
        }

        return true;
    };

    // Submit deposit
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (method === 'BANK_TRANSFER' && !validateFile(slipFile)) return;

        const formData = new FormData();
        formData.append('userId', userId);
        formData.append('depositMethod', method);
        formData.append('amount', amount);
        
        if (method === 'BANK_TRANSFER' && slipFile) {
            formData.append('slipFile', slipFile);
        }

        try {
            await axios.post('http://localhost:8080/api/deposits',
                formData,
                {
                    ...getAuthConfig(),
                    headers: {
                        ...getAuthConfig().headers,
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );
            
            // Reset form and refresh data
            setAmount('');
            setSlipFile(null);
            await fetchDeposits();
            alert('Deposit request submitted successfully!');
            
        } catch (error) {
            setError('Deposit submission failed. Please try again.');
            console.error('Deposit failed:', error);
        }
    };

    // Handle deposit details view
    const handleViewDetails = (depositId) => {
        const deposit = deposits.find(d => d.id === depositId);
        setSelectedDeposit(deposit);
        setPopupVisible(true);
    };

    // Format currency
    const formatCurrency = (value) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(value);
    };

    return (
        <div className="container mt-4">
            <h2 className="mb-4">Deposit Money</h2>
            
            {/* Deposit Form */}
            <div className="card mb-4 p-4">
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Deposit Method</label>
                        <select 
                            className="form-select"
                            value={method} 
                            onChange={(e) => setMethod(e.target.value)}
                        >
                            <option value="BANK_TRANSFER">Bank Transfer</option>
                            <option value="ONLINE_PAYMENT">Online Payment</option>
                        </select>
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Amount</label>
                        <input
                            className="form-control"
                            type="number"
                            min="1"
                            step="0.01"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="Enter amount"
                            required
                        />
                    </div>

                    {method === 'BANK_TRANSFER' && (
                        <div className="mb-3">
                            <label className="form-label">Upload Bank Slip</label>
                            <input
                                className="form-control"
                                type="file"
                                accept="image/*,application/pdf"
                                onChange={(e) => setSlipFile(e.target.files[0])}
                                required
                            />
                            <small className="form-text text-muted">
                                (Max 5MB, PDF/JPEG/PNG only)
                            </small>
                        </div>
                    )}

                    {error && <div className="alert alert-danger">{error}</div>}

                    <button 
                        type="submit" 
                        className="btn btn-primary"
                        disabled={loading}
                    >
                        {loading ? 'Submitting...' : 'Submit Deposit'}
                    </button>
                </form>
            </div>

            {/* Deposits List */}
            <div className="card p-4">
                <h4 className="mb-3">Deposit History</h4>
                
                {loading ? (
                    <div className="text-center">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
                
                ) : deposits.length > 0 ? (
                    <div className="table-responsive">
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Method</th>
                                    <th>Amount</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {deposits.map((deposit) => (
                                    <tr key={deposit.id}>
                                        <td>
                                            {new Date(deposit.createdAt).toLocaleDateString()}
                                        </td>
                                        <td>{deposit.depositMethod}</td>
                                        <td>{formatCurrency(deposit.amount)}</td>
                                        <td>
                                            <span className={`badge 
                                                ${deposit.status === 'PENDING' ? 'bg-warning' : 
                                                   deposit.status === 'APPROVED' ? 'bg-success' : 'bg-danger'}`}>
                                                {deposit.status}
                                            </span>
                                        </td>
                                        <td>
                                            <button
                                                className="btn btn-sm btn-outline-primary"
                                                onClick={() => handleViewDetails(deposit.id)}
                                            >
                                                Details
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="alert alert-info">No deposits found</div>
                )}
            </div>

            {/* Details Modal */}
            {isPopupVisible && selectedDeposit && (
                <div className="overlay">
                <div className="popup">
                    <h5 className="card-title fw-bold">Deposit Details</h5>
                          
            
                        
                        <div className=" mt-3">
                            <dl className="row">
                                <dt className="col-sm-4">Transaction ID:</dt>
                                <dd className="col-sm-8">{selectedDeposit.id}</dd>

                                <dt className="col-sm-4">Amount:</dt>
                                <dd className="col-sm-8">{formatCurrency(selectedDeposit.amount)}</dd>

                                <dt className="col-sm-4">Method:</dt>
                                <dd className="col-sm-8">{selectedDeposit.depositMethod}</dd>

                                <dt className="col-sm-4">Status:</dt>
                                <dd className="col-sm-8">
                                    <span className={`badge 
                                        ${selectedDeposit.status === 'PENDING' ? 'bg-warning' : 
                                           selectedDeposit.status === 'APPROVED' ? 'bg-success' : 'bg-danger'}`}>
                                        {selectedDeposit.status}
                                    </span>
                                </dd>

                                <dt className="col-sm-4">Date:</dt>
                                <dd className="col-sm-8">
                                    {new Date(selectedDeposit.createdAt).toLocaleString()}
                                </dd>

                                {selectedDeposit.slipFilePath && (
                                    <>
                                        <dt className="col-sm-4">Bank Slip:</dt>
                                        <dd className="col-sm-8">
                                            <a
                                                href={`http://localhost:8080/slips/${selectedDeposit.slipFilePath}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="btn btn-link"
                                            >
                                                View Slip
                                            </a>
                                        </dd>
                                    </>
                                )}
                            </dl>
                        </div>
                        <button 
                                type="button" 
                                className="pt-2 btn btn-secondary" 
                                onClick={() => setPopupVisible(false)}>Close</button>
                            
                    </div>

                </div>
            )}
        </div>
    );
};

export default DepositForm;