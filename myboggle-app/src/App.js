import React, { useState, useEffect, useMemo } from 'react';
import { GAME_STATE } from './GameState.js';
import Board from './Board.js';
import GuessInput from './GuessInput.js';
import FoundSolutions from './FoundSolutions.js';
import SummaryResults from './SummaryResults.js';
import ToggleGameState from './ToggleGameState.js';
import logo from './logo.png';
import './App.css';
import Home from './Home';
import ModeSelection from './ModeSelection'; // Import ModeSelection component

function App() {
  const obj = require('./Boggle_Solutions_Endpoint.json');
  const [allSolutions, setAllSolutions] = useState([]); // solutions from solver
  const [foundSolutions, setFoundSolutions] = useState([]); // found by user
  const [gameState, setGameState] = useState(GAME_STATE.BEFORE); // Game state (before, in-progress, ended)
  const [grid, setGrid] = useState([]); // the grid
  const [totalTime, setTotalTime] = useState(0); // total time elapsed
  const [size, setSize] = useState(3); // selected grid size
  const [game, setGame] = useState({}); // used to hold the game data
  const [isLoggedIn, setIsLoggedIn] = useState(false); // login state
  const [isInModeSelection, setIsInModeSelection] = useState(false); // State to track mode selection screen

  const myMap = useMemo(() => new Map(Object.entries(obj)), [obj]);

  useEffect(() => {
    let tmpAllSolutions = game.solutions;
    setAllSolutions(tmpAllSolutions);
  }, [grid, game]);

  useEffect(() => {
    if (gameState === GAME_STATE.IN_PROGRESS) {
      const g = myMap.get(size.toString());
      setGame(g);
      setGrid(g.grid);
      setFoundSolutions([]);
    }
  }, [gameState, size]);

  function correctAnswerFound(answer) {
    console.log("New correct answer:" + answer);
    setFoundSolutions([...foundSolutions, answer]);
  }

  // Function to start the game after selecting a mode
  const startGame = () => {
    setIsInModeSelection(false); // Hide the mode selection screen
    setGameState(GAME_STATE.IN_PROGRESS); // Start the game
  };

  // Function to handle logging in
  const handleLogin = () => {
    setIsLoggedIn(true); // Set login state to true
    setIsInModeSelection(true); // Show the mode selection screen
  };

  return (
    <div className="App">
      {!isLoggedIn ? (
        <Home onLogin={handleLogin} /> // Pass the handleLogin function to Home
      ) : (
        <div>
          {isInModeSelection ? (
            <ModeSelection onStartGame={startGame} />
          ) : (
            <div>
              <img src={logo} width="25%" height="25%" className="logo" alt="Bison Boggle Logo" />
              <ToggleGameState gameState={gameState}
                               setGameState={(state) => setGameState(state)} 
                               setSize={(state) => setSize(state)}
                               setTotalTime={(state) => setTotalTime(state)} />
              {gameState === GAME_STATE.IN_PROGRESS && (
                <div>
                  <Board board={grid} />
                  <GuessInput allSolutions={allSolutions}
                              foundSolutions={foundSolutions}
                              correctAnswerCallback={(answer) => correctAnswerFound(answer)} />
                  <FoundSolutions headerText="Solutions you've found" words={foundSolutions} />
                </div>
              )}
              {gameState === GAME_STATE.ENDED && (
                <div>
                  <Board board={grid} />
                  <SummaryResults words={foundSolutions} totalTime={totalTime} />
                  <FoundSolutions headerText="Missed Words [wordsize > 3]: " words={allSolutions} />
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;



