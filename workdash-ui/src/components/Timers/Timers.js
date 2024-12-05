import Timer from "./Timer"
import TimerControls from "./Controls"
import { useState, useEffect, useCallback } from "react"

export default function Timers() {
  const [runningTimer, setRunningTimer] = useState(null);

  const getCurrentDateString = () => {
    return new Date().toISOString().split("T")[0];
  }

  const getSavedTimersFromLocalStorage = () => {
    return JSON.parse(localStorage.getItem(getCurrentDateString())) ?? [];
  }

  const [timers, setTimers] = useState(
    getSavedTimersFromLocalStorage()
  );

  const handleSaveTimers = useCallback(() => {
    localStorage.setItem(getCurrentDateString(), JSON.stringify(timers))
  }, [timers]);

  useEffect(() => {
    handleSaveTimers();
  }, [timers, handleSaveTimers])

  // keep a record of which timer is currently active
  const handleStart = (timerKey) => {
    setRunningTimer(timerKey);
  }

  const deleteTimerByKey = (key) => {
    const modifiedTimers = timers.filter(timer => timer.key !== key);
    setTimers(modifiedTimers);
  }

  const updateTimerByKey = (key, title, description, duration) => {
    const modifiedTimers = timers.map((timer) => {
      if (timer.key === key) {
          return {
              ...timer,
              title,
              description,
              duration
          };
      }

      return timer;
  });

    setTimers(modifiedTimers);
  }

  const updateTimerState = (key, title, description, duration) => {
    updateTimerByKey(key, title, description, duration);
  }

  const addTimer = () => {
    setTimers([...timers, {key: crypto.randomUUID(), title: '', description: '', duration: 0}]);
    setRunningTimer(null);
  }

  const removeTimer = (key) => {
    deleteTimerByKey(key);
  }

  const timerList = timers.map((timer) => {
    return <Timer 
      key={timer.key} 
      id={timer.key}
      title={timer.title}
      duration={timer.duration}
      description={timer.description}
      isRunning={runningTimer === timer.key} 
      onStart={handleStart} onUpdateTimerState={updateTimerState}
      onRemove={removeTimer}
      />
  })

  return (
    <div className="timer-panel">
      <TimerControls onAddTimer={addTimer} onSaveTimers={handleSaveTimers} />
      <div className="timers flex flex-wrap gap-3">
        {timerList}
      </div>
    </div>
  )
}