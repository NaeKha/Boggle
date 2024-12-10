import React from 'react';
import './ModeSelection.css';

const ModeSelection = ({ onStartGame }) => {
  return (
    <div className="mode-selections">
      <h1 className="welcome-title">Welcome to Boggle</h1>
      <p className="user-greeting">Hello ...</p>
      <div className="button-container">
        <button
          className="mode-button"
          onClick={() => onStartGame("regular")}
        >
          Regular Mode
        </button>
        <button
          className="mode-button"
          onClick={() => onStartGame("challenge")}
        >
          Daily Challenge
        </button>
      </div>
      <p className="game-message">
        Play our regular mode for a fun time, but if you want to challenge yourself, try out our challenge mode!
      </p>
    </div>
  );
};

export default ModeSelection;