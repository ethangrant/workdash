import { useState, useRef, useEffect } from "react"

export default function Timer() {
  const startTime = useRef(0);
  const timerId = useRef(0);

  const [isRunning, setIsRunning] = useState(false);
  const [totalTime, setTotalTime] = useState(0);

  useEffect(() => {
    clearTimeout(timerId.current);
  }, []);

  function handleStartTimer() {
    if (isRunning) {
      return;
    }

    startTime.current = Date.now() - totalTime;
    setIsRunning(true);
    incrementTimer();
  }

  function handleStopTimer() {
    clearTimeout(timerId.current);
    setIsRunning(false);
  }

  function handleClearTimer() {
    clearTimeout(timerId.current);
    setIsRunning(false);
    setTotalTime(0);
  }

  function incrementTimer() {
    let elaspedTime = Date.now() - startTime.current;

    setTotalTime(elaspedTime);
    timerId.current = setTimeout(incrementTimer, 10)
  }

  const time = new Date(totalTime);
  const hours = String(time.getUTCHours()).padStart(2, '0');
  const minutes = String(time.getUTCMinutes()).padStart(2, '0');
  const seconds = String(time.getUTCSeconds()).padStart(2, '0');

  return (
    <div className="card timer task">
      <div className="time">
        <span className="hours">{hours}</span>:<span className="minutes">{minutes}</span>:<span className="seconds">{seconds}</span>
      </div>
      <div className="controls">
            <button onClick={handleStartTimer}>Start</button>
            <button onClick={handleStopTimer}>Stop</button>
            <button onClick={handleClearTimer}>Clear</button>
        </div>
    </div>
  )
}