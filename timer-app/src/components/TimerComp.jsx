import React, { useState, useEffect, useRef } from "react";
import "../App.css";

function TimerComp() {
  const formatTime = (time) => (time < 10 ? `0${time}` : time);

  const [time, setTime] = useState(0);
  const [lap, setLap] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [timeValue, setTimeValue] = useState('');
  const [iscountDown, setIsCountDown] = useState(false);
  const ref = useRef();

  useEffect(() => {
    return () => stopTimer();
  }, []);

  function startTimer() {
    if (ref.current !== null) return;
    setIsRunning(true);

    if (iscountDown) {
      ref.current = setInterval(() => {
        setTime((prev) => {
          if (prev <= 1) {
            clearInterval(ref.current);
            ref.current = null;
            setIsRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      ref.current = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
    }
  }

  function stopTimer() {
    setIsRunning(false);
    clearInterval(ref.current);
    ref.current = null;
  }

  function resetTimer() {
    setIsRunning(false);
    setIsCountDown(false);
    stopTimer();
    setTime(0);
  }

  function lapFun() {
    setLap([
      ...lap,
      [`${formatTime(hour)} : ${formatTime(minute)} : ${formatTime(second)}`],
    ]);
  }

  function setTimer() {
    setTime(timeValue);
    setTimeValue("");
    setIsCountDown(true);
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
        <input
          value={timeValue}
          onChange={(e) => setTimeValue(Number(e.target.value))}
          type="text"
          placeholder="Enter seconds"
          className="inp"
          maxLength={4}
        />
        <button className="button setTime" onClick={setTimer}>
          Set Countdown
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
