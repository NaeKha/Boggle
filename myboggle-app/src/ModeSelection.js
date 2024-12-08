import React from 'react';
import './ModeSelection.css';

const ModeSelections = ({ onStartGame }) => {
  return (
    <div className="mode-selections">
      <h1 className="welcome-title">Welcome to Boggle</h1>
      <p className="user-greeting">Hello ...</p>
      <div className="button-container">
        <button className="mode-button" onClick={onStartGame}>Regular Mode</button>
        <button className="mode-button" onClick={onStartGame}>Daily Challenge</button>
      </div>
      <p className="game-message">
        Play our regular mode for a fun time, but if you want to challenge yourself, try out our challenge mode!
      </p>
    </div>
  );
};

export default ModeSelections;