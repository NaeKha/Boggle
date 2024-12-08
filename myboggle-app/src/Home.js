import React from 'react';
import './Home.css';

const Home = ({ onLogin }) => {
  return (
    <div className="home">
      <h1 className="title">Welcome to Boggle</h1>
      <button className="login-btn" onClick={onLogin}>
        Login to play!
      </button>
    </div>
  );
};

export default Home;