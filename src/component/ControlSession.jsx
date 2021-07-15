import "../style/ControlSession.scss";

function ControlSession(props) {
  return (
    <div className="container">
      <h5 id={props.id}>{props.title}</h5>
      <div className="row">
        <button id={props.idDecrement} className="col btn-info">
          <i class="bi bi-caret-down-fill"></i>
        </button>
        <div id={props.idLabel} className="col">
          {props.value}
        </div>
        <button id={props.idIncrement} className="col btn btn-info">
          <i class="bi bi-caret-up-fill"></i>
        </button>
      </div>
    </div>
  );
}

export default ControlSession;
