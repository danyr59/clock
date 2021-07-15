import "../style/Timer.scss";

function Timer(props) {
  return (
    <div>
      <div id="timer-label">
        <h3>Session</h3>
      </div>
      <div translate="no" id="time-left">
        {props.value}
      </div>
    </div>
  );
}
export default Timer;
