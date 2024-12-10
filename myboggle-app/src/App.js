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
import CountdownTimer from './CountdownTimer';


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
  const [isInModeSelection, setIsInModeSelection] = useState(true); // State to track mode selection screen
  const [mode, setMode] = useState("regular"); // Default to "regular" mode


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
  const startGame = (selectedMode) => {
    setMode(selectedMode)
    setIsInModeSelection(false); // Hide the mode selection screen
    setGameState(GAME_STATE.IN_PROGRESS); // Start the game

    if (selectedMode === "challenge") {
      const randomSize = Math.floor(Math.random() * 5) + 6; // Random size between 6 and 10
      setSize(randomSize);
      setTotalTime(180); // 3-minute countdown
    } else {
      setTotalTime(0); // No countdown for regular mode
    }
  };

  // Function to handle logging in
  const handleLogin = () => {
    setIsLoggedIn(true); // Set login state to true
    setIsInModeSelection(true); // Show the mode selection screen
  };
  //Countdown timer component 
  const CountdownTimer = ({ initialTime, onTimeUp }) => {
    const [time, setTime] = useState(initialTime);
  
    useEffect(() => {
      if (time > 0) {
        const timerId = setInterval(() => {
          setTime((prevTime) => prevTime - 1);
        }, 1000);
  
        return () => clearInterval(timerId); // Cleanup interval on unmount
      } else {
        onTimeUp(); // Trigger onTimeUp when timer reaches 0
      }
    }, [time, onTimeUp]);
  
    return <div>Time left: {time} seconds</div>;
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
                  {totalTime > 0 && (
                    <div>
                     <CountdownTimer
                          initialTime={totalTime}
                          onTimeUp={() => setGameState(GAME_STATE.ENDED)} />
                          <Board board={grid} />
                           <GuessInput 
                            allSolutions={allSolutions}
                            foundSolutions={foundSolutions}
                            correctAnswerCallback={(answer) => correctAnswerFound(answer)} 
                            />
                            <FoundSolutions headerText="Solutions you've found" words={foundSolutions} />
                          </div>
                       )}
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



