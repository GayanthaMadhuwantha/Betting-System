import React,{ useEffect }from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = ({ setIsLoggedIn }) => {
const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem('adminToken');
        if (!token ) {
            navigate('/admin/login');
        }
        else{
            setIsLoggedIn(true);
        }
    }, []);
    
    return (
        <div>
            <h3>Welcome to the Admin Dashboard</h3>
            <h4><a href='/admin/matches'>Create Live Match</a></h4>
            <h4><a href='/live-matches'>All  Matches</a></h4>
            <h4><a href='/notices'>Notices</a></h4>
        </div>
    );
};

export default AdminDashboard;
