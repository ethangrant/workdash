import { useState, useRef, useEffect } from "react"

export default function Timer({id, isRunning, onStart}) {
  const startTime = useRef(0);
  const timerId = useRef(0);

  const [totalTime, setTotalTime] = useState(0);

  useEffect(() => {
    clearTimeout(timerId.current);
  }, []);

  // current timer should be stopped if another timer has started
  useEffect(() => {
    if (!isRunning) {
      handleStopTimer();
      return;
    }
  }, [isRunning]);

  function handleStartTimer() {
    if (isRunning) {
      return;
    }

    startTime.current = Date.now() - totalTime;

    // tell parent this timer is currently active
    onStart(id)
    incrementTimer();
  }

  function handleStopTimer() {
    clearTimeout(timerId.current);

    if (isRunning) {
      onStart(null)
    }
  }

  function handleClearTimer() {
    clearTimeout(timerId.current);
    setTotalTime(0);

    // clear running timer id if this timer was currently running
    if (isRunning) {
      onStart(null)
    }
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