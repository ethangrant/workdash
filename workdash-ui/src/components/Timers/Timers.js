import Timer from "./Timer"
import TimerControls from "./Controls"
import { useState } from "react"
import './Timers.css'

export default function Timers() {
  const [timers, setTimers] = useState([
    {key: crypto.randomUUID(), duration: 0}
  ])

  const renderTimers = timers.map((timer) => {
    return <Timer key={timer.key} />
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