import "../style/ControlSession.scss";

function ControlSession(props) {
  return (
    <div className="container">
      <h5>{props.title}</h5>
      <div className="row">
        <div className="col">
          <i class="bi bi-caret-down-fill"></i>
        </div>
        <div className="col">{props.value}</div>
        <div className="col">
          <i class="bi bi-caret-up-fill"></i>
        </div>
      </div>
    </div>
  );
}

export default ControlSession;
