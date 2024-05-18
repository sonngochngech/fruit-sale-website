import React, { useState, useEffect } from 'react';

function TimeCounter() {
  const [time, setTime] = useState(100); // Set initial time to 10 seconds
  const [countdownCompleted, setCountdownCompleted] = useState(false);

  useEffect(() => {
    // Exit if time reaches 0
    if (time === 0) {
      setCountdownCompleted(true); // Set countdownCompleted flag to true when countdown is completed
      return;
    }

    const interval = setInterval(() => {
      // Decrement time every second until it reaches 0
      setTime(prevTime => prevTime - 1);
    }, 1000);

    // Cleanup function to clear interval when component unmounts or time reaches 0
    return () => clearInterval(interval);
  }, [time]); // Include time as a dependency to rerun effect when time changes

  // Helper function to format time in MM:SS format
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes < 10 ? '0' + minutes : minutes}:${remainingSeconds < 10 ? '0' + remainingSeconds : remainingSeconds}`;
  };

  // Render the counter if countdown is not completed, otherwise render null
  return (
    <div>
      {!countdownCompleted && (
        <p>send again: {formatTime(time)}</p>
      )}
    </div>
  );
}

export default TimeCounter;
