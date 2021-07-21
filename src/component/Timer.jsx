import "../style/Timer.scss";

function Timer(props) {
  return (
    <div>
      <h3 id="timer-label">{props.timerLabel}</h3>
      <div id="time-left">{props.value.match(/a/) ? "00:00" : props.value}</div>
    </div>
  );
}
export default Timer;
