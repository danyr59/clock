import "../style/Timer.scss";

function Timer(props) {
  return (
    <div>
      <h3 id="timer-label">Session</h3>
      <div id="time-left">{props.hour ? "60:00" : props.value}</div>
    </div>
  );
}
export default Timer;
