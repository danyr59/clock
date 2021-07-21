import "../style/ControlSession.scss";
import React, { useState, useEffect } from "react";
function ControlSession(props) {
  const [length, setLength] = useState(props.value);
  const [handlerSelectorTime, setHandlerSelectorTime] = useState(
    props.handlerSelectorTime
  );

  function handlerArrowUp() {
    if (length >= 60) return;
    if (props.startStop == true) return;
    handlerSelectionValues(length + 1);
    setLength(length + 1);
  }
  function handlerArrowDown() {
    if (length <= 1) return;
    if (props.startStop == true) return;
    handlerSelectionValues(length - 1);
    setLength(length - 1);
  }
  /**
   * funcion controla quien puede modificar los valores del timer cuando esta en pause
   * @param valor por el cual va a ser actualizado el timer
   */
  function handlerSelectionValues(length) {
    // si esta pausado el timer no se pueden modificar los valores
    if (handlerSelectorTime) props.updateValues(length);
  }
  /**
   * funcion que selecciona el valor siguiente a actualizar
   */
  function updatesValues() {
    // si esta pausado el timer no se pueden modificar los valores y esta corriendo el reloj
    if (props.startStop == false) return;
    if (handlerSelectorTime) {
      props.updateValues(length);
      props.setTimerLabel(props.timerLabel);
    }
  }
  /**
   *  actualiza el valor en caso de actualizarse el temporizador
   */
  function updateReboot() {
    if (props.reboot) {
      setLength(props.value);
      props.setReboot(false);
      setHandlerSelectorTime(props.handlerSelectorTime);
    }
  }
  useEffect(() => {
    updateReboot();
    if (props.zero) {
      setHandlerSelectorTime(!handlerSelectorTime);
      return;
    }
    updatesValues();

    // if (zero && handlerSelectorTime) {
    //   handlerSelectorTimer();
    // }
    // if (zero) {
    //   setHandlerSelectorTime(!handlerSelectorTime);
    //   setZero(false);
    // }
  }, [props.zero, props.reboot]);
  // console.log(
  //   `${props.idLabel}\n`,
  //   `props.zero = ${props.zero}\n`,
  //   `handlerSelectorTime ${handlerSelectorTime}\n\n`
  // );
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
