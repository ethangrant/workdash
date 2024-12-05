import { useState, useRef, useEffect, useCallback } from "react";
import Button from "../Button";
import InputText from "../InputText";

export default function Timer({ id, title, description, duration, isRunning, onStart, onUpdateTimerState, onRemove }) {
  const startTime = useRef(0);
  const timerRef = useRef(null);
  const [totalTime, setTotalTime] = useState(duration);
  const [currentTitle, setCurrentTitle] = useState(title);
  const [currentDescription, setCurrentDescription] = useState(description);

  const updateTimerState = useCallback(() => {
    onUpdateTimerState(id, currentTitle, currentDescription, totalTime);
  }, [id, currentTitle, currentDescription, totalTime, onUpdateTimerState]);

  const handleStopTimer = useCallback(() => {
    if (timerRef.current) {
      cancelAnimationFrame(timerRef.current);
      timerRef.current = null;
    }
    if (isRunning) {
      onStart(null);
      updateTimerState();
    }
  }, [isRunning, onStart, updateTimerState]);

  const incrementTimer = useCallback(() => {
    const elapsedTime = Date.now() - startTime.current;
    setTotalTime(elapsedTime);
    onUpdateTimerState(id, currentTitle, currentDescription, elapsedTime);

    timerRef.current = requestAnimationFrame(incrementTimer);
  }, [currentDescription, currentTitle, id, onUpdateTimerState]);

  const handleStartTimer = () => {
    if (isRunning) return;

    startTime.current = Date.now() - totalTime;
    onStart(id);
    incrementTimer();
  };

  const handleClearTimer = () => {
    handleStopTimer();
    setTotalTime(0);
    onUpdateTimerState(id, currentTitle, currentDescription, 0);
  };

  useEffect(() => {
    // Stop the timer if another timer starts
    if (!isRunning) {
      handleStopTimer();
    }
  }, [isRunning, handleStopTimer]);

  const handleTitleChange = (e) => {
    setCurrentTitle(e.target.value);
    onUpdateTimerState(id, e.target.value, currentDescription, totalTime);
  };

  const handleDescriptionChange = (e) => {
    setCurrentDescription(e.target.value);
    onUpdateTimerState(id, currentTitle, e.target.value, totalTime);
  };

  const handleRemoveTimer = () => {
    onRemove(id);
  }

  const time = new Date(totalTime);
  const hours = String(time.getUTCHours()).padStart(2, "0");
  const minutes = String(time.getUTCMinutes()).padStart(2, "0");
  const seconds = String(time.getUTCSeconds()).padStart(2, "0");

  return (
    <div className="p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <InputText name={'title'} value={currentTitle} onChange={handleTitleChange} className="mb-3" />
      <InputText name={'description'} value={currentDescription} onChange={handleDescriptionChange} className="mb-3"/>
      <div className="text-center text-lg">
        <span className="hours">{hours}</span>:<span className="minutes">{minutes}</span>:<span className="seconds">{seconds}</span>
      </div>
      <div className="controls">
        <Button onClick={handleStartTimer} disabled={isRunning} type={isRunning ? 'primary' : 'secondary'}>
          Start
        </Button>
        <Button onClick={handleStopTimer} type={'secondary'}>
          Stop
        </Button>
        <Button onClick={handleClearTimer} type={'secondary'}>
          Clear
        </Button>
        <Button onClick={handleRemoveTimer} type={'destructive'}>
          Remove
        </Button>
      </div>
    </div>
  );
}