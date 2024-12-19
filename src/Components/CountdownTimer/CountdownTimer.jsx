import React, { useState, useEffect } from "react";

const CountdownTimer = ({ seconds }) => {
  const [remainingTime, setRemainingTime] = useState(seconds);
  const radius = 20; // Radius of the circle
  const circumference = 2 * Math.PI * radius; // Circumference of the circle

  useEffect(() => {
    if (remainingTime > 0) {
      const timer = setInterval(() => {
        setRemainingTime((prevTime) => prevTime - 1);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [remainingTime]);

  const strokeDashoffset =
    ((seconds - remainingTime) / seconds) * circumference;

  return (
    <div className="countdown">
      <svg width="50" height="50" className="countdown-circle">
        <circle
          stroke="white"
          fill="transparent"
          strokeWidth="3"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          r={radius}
          cx="25"
          cy="25"
        />
      </svg>
      <div className="countdown-timer">{remainingTime} seconds</div>
    </div>
  );
};
export default CountdownTimer;
