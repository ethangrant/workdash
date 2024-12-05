export default function Controls({onAddTimer, onSaveTimers}) {
  return (
    <div className="controls">
      <button onClick={onAddTimer}>Add Timer</button>
      <button onClick={onSaveTimers}>Save</button>
    </div>
  )
}