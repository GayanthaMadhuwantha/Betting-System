import React from 'react';

const Home = ({ user, balance }) => {
  return (
    <div>
      <h2>Welcome, {user?.username || 'User'}!</h2>
      <p>Your current balance is: ${balance}</p>
    </div>
  );
};

export default Home;
