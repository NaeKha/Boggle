import React, { useState, useEffect } from 'react';

const CountdownTimer = ({ initialTime, onTimeUp }) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      onTimeUp(); // Call the callback when time is up
    }
  }, [timeLeft, onTimeUp]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return <div className="countdown-timer">Time Left: {formatTime(timeLeft)}</div>;
};

export default CountdownTimer;
