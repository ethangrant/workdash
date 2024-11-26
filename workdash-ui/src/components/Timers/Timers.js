import Timer from "./Timer"
import TimerControls from "./Controls"
import { useState } from "react"
import './Timers.css'

export default function Timers() {
  const [runningTimer, setRunningTimer] = useState(null);
  const [timers, setTimers] = useState([
    {key: crypto.randomUUID(), duration: 0}
  ]);

  // keep a record of which timer is currently active
  function handleStart(timerKey) {
    setRunningTimer(timerKey);
  }

  const renderTimers = timers.map((timer) => {
    return <Timer key={timer.key} id={timer.key} isRunning={runningTimer === timer.key} onStart={handleStart} />
  })

  function addTimer() {
    setTimers([...timers, {key: crypto.randomUUID(), duration: 0}]);
  }

  return (
    <div className="timer-panel">
      <TimerControls onAddTimer={addTimer} />
      <div className="timers">
        {renderTimers}
      </div>
    </div>
  )
}