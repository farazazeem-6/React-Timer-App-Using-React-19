import React, { useState, useEffect, useRef } from "react";
import "../App.css";

function TimerComp() {
  const formatTime = (time) => (time < 10 ? `0${time}` : time);

  const [time, setTime] = useState(0);
  const [lap, setLap] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const ref = useRef();

  useEffect(() => {
    return () => stopTimer();
  }, []);

  function startTimer() {
    setIsRunning(true);
    if (ref.current !== null) return;
    ref.current = setInterval(() => {
      setTime((prev) => prev + 1);
    }, 1000);
  }

  function stopTimer() {
    setIsRunning(false);
    clearInterval(ref.current);
    ref.current = null;
  }

  function resetTimer() {
    setIsRunning(false);
    stopTimer();
    setTime(0);
  }
  function lapFun() {
    setLap([
      ...lap,
      [`${formatTime(hour)} : ${formatTime(minute)} : ${formatTime(second)}`],
    ]);
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
        <button
          disabled={!isRunning}
          className={` button lap ${!isRunning ? "disable" : ""} `}
          onClick={lapFun}
        >
          Set Lap
        </button>
      </div>

      <div className="lap-div">
        <h2>Time Laps</h2>
        <div className="lap-item">
          <h3>
            {lap.map((lap, index) => (
              <li>
                {`Lap ${index + 1}`} : {lap}
              </li>
            ))}
          </h3>
        </div>
      </div>
    </div>
  );
}

export default TimerComp;
