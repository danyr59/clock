import "../style/ControlSession.scss";
import React, { useState, useEffect } from "react";
function ControlSession(props) {
  const [length, setLength] = useState(props.value);
  const [zero, setZero] = useState(false);
  const [handlerSelectorTime, setHandlerSelectorTime] = useState(
    props.handlerSelectorTime
  );

  function handlerArrowUp() {
    if (length >= 60) return;
    if (props.startStop) return;
    setTimeout(() => setLength(length + 1), 50);
    if (props.updateValues) props.updateValues(length + 1);
  }
  function handlerArrowDown() {
    if (length <= 1) return;
    if (props.startStop) return;
    setTimeout(() => setLength(length - 1), 50);
    if (props.updateValues) props.updateValues(length - 1);
  }
  /**
   *  actualiza el valor en caso de actualizarse el temporizador
   */
  function updateReboot() {
    if (props.reboot) {
      setLength(props.value);
      props.setReboot(false);
      setZero(false);
      setHandlerSelectorTime(props.handlerSelectorTime);
    }
  }
  useEffect(() => {
    isZero();
    updateReboot();
    if (zero && handlerSelectorTime) {
      props.updateValuesT(length);
    }
    if (zero) {
      setHandlerSelectorTime(!handlerSelectorTime);
      setZero(false);
    }
  });
  function isZero() {
    if (props.timeLeft.minutes == 0 && props.timeLeft.seconds == 0) {
      setTimeout(() => {
        console.log("isZero()");
        setZero(true);
      }, 1000);
    }
  }
  console.log(
    zero,
    props.timeLeft.minutes,
    props.timeLeft.seconds,
    handlerSelectorTime
  );
  return (
    <div className="container">
      <h5 id={props.idLabel}>{props.title}</h5>
      <div className="row">
        <div className="col">
          <button
            id={props.idDecrement}
            className="btn btn-info"
            onClick={handlerArrowDown}
          >
            <i class="bi bi-caret-down-fill"></i>
          </button>
        </div>
        <div id={props.idLength} translate="no" className="col">
          {/*props.reboot ? props.value : length*/}
          {length}
        </div>
        <div className="col">
          <button
            id={props.idIncrement}
            className="btn btn-info"
            onClick={handlerArrowUp}
          >
            <i class="bi bi-caret-up-fill"></i>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ControlSession;
