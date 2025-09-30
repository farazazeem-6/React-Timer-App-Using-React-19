import React, { useState, useEffect, useRef } from "react";
import "../App.css";

function TimerComp() {
  const formatTime = (time) => (time < 10 ? `0${time}` : time);

  const [time, setTime] = useState(0);
  const ref = useRef();

  useEffect(() => {
    return () => stopTimer();
  }, []);

  function startTimer() {
    if (ref.current !== null) return;
    ref.current = setInterval(() => {
      setTime((prev) => prev + 1);
    }, 1000);
  }

  function stopTimer() {
    clearInterval(ref.current);
    ref.current = null;
  }

  function resetTimer() {
    stopTimer();
    setTime(0);
  }

  const second = time % 60;
  const minute = Math.floor(time / 60) % 60;
  const hour = Math.floor(time / 3600);

  return (
    <div>
      <h3 className="timer">
        Time: {formatTime(hour)}:{formatTime(minute)}:{formatTime(second)}
      </h3>
      <div className="btn">
        <button className="button start" onClick={startTimer}>
          Start
        </button>
        <button className="button stop" onClick={stopTimer}>
          Stop
        </button>
        <button className="button reset" onClick={resetTimer}>
          Reset
        </button>
      </div>
    </div>
  );
}

export default TimerComp;
