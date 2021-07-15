import "../style/Timer.scss";

function Timer({ value }) {
  return (
    <div>
      <div id="timer-label">
        <h3>Session</h3>
      </div>
      <div id="time-left">{value}</div>
    </div>
  );
}
export default Timer;
