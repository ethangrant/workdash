export default function Controls({onAddTimer}) {
  function handleSaveTimers() {
    alert('save timers clicked');
  }

  return (
    <div className="controls">
      <button onClick={onAddTimer}>Add Timer</button>
      <button onClick={handleSaveTimers}>Save</button>
    </div>
  )
}