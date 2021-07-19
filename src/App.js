import ControlSession from "./component/ControlSession.jsx";
import Timer from "./component/Timer.jsx";
import "./App.scss";
import React, { useState, useEffect } from "react";
Date.prototype.getFormatMinSecond = function () {
  let format = this.toLocaleTimeString();
  return format.slice(3);
  // return this.getMinutes() + ":" + this.getSeconds();
};
Date.prototype.setFormatMinSecond = function (min, seg) {
  this.setMinutes(min, seg);
};
//   let a = new Date();
//   console.log(a);
//   let ownProps = [];
//   for (let property in Date) {
//     if (Date.hasOwnProperty(property)) {
//       ownProps.push(property);
//     }
//   }
//
// console.log(ownProps);
const inizializeTimeLeft = function (length) {
  const difference = length * 60 * 1000;
  let timeLeft = {};
  if (difference > 0) {
    timeLeft = {
      year: 0,
      month: 0,
      date: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
      ms: 0,
    };
  }
  return timeLeft;
};
const getDate = function ({ minutes: minutes, seconds: seg, ms: ms }) {
  //402 ms tiempo de retrazo producido
  console.log(minutes, seg, ms);
  const difference = minutes * 60 * 1000 + seg * 1000 + ms + 402;
  return new Date(+new Date() + difference);
};
function App() {
  const [date, setDate] = useState(getDate({ minutes: 25, seconds: 0, ms: 0 }));
  const [timeLeft, setTimeLeft] = useState(inizializeTimeLeft(25));
  const [startStop, setStartStop] = useState(false);
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [reboot, setReboot] = useState(false);
  const calculateTimeLeft = () => {
    console.log(`date: ${date}`);
    const difference = +date - +new Date();
    let timeLeft = {};
    if (difference > 0) {
      timeLeft = {
        year: 0,
        month: 0,
        date: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
        ms: 0,
      };
    }
    return timeLeft;
  };
  function getTimeLeft({ year, month, date, hours, minutes, seconds, ms }) {
    // let a = new Date(year, month, date, hours, minutes, seconds, ms);
    // console.log(a, new Date());
    return new Date(
      year,
      month,
      date,
      hours,
      minutes,
      seconds,
      ms
    ).getFormatMinSecond();
  }
  function startStopOnClick() {
    setStartStop(!startStop);
    setDate(getDate(timeLeft));
  }
  useEffect(() => {
    if (startStop) {
      const timer = setTimeout(() => {
        setTimeLeft(calculateTimeLeft());
      }, 1000);
      return () => clearTimeout(timer);
    }
    // , [timeLeft]
  });
  function rebootTimeLeft() {
    setReboot(true);
    setStartStop(false);
    setDate(getDate({ minutes: 25, seconds: 0, ms: 0 }));
    setTimeLeft(inizializeTimeLeft(25));
    setBreakLength(5);
    setSessionLength(25);
  }
  function updateValue(value) {
    // setStartStop(false);
    setDate(getDate({ minutes: value, seconds: 0, ms: 0 }));
    setTimeLeft(inizializeTimeLeft(value));
  }
  function updateValueT(value) {
    // setStartStop(true);
    setDate(getDate({ minutes: value, seconds: 0, ms: 0 }));
    setTimeLeft(inizializeTimeLeft(value));
  }
  return (
    <div className="App ">
      <header className="">
        <h1>25 + 5 Clock</h1>
      </header>
      <div className="row w-50">
        <div className="col">
          <ControlSession
            // handlerTimeLeft={false}
            handlerSelectorTime={true}
            idLabel={"break-label"}
            idDecrement={"break-decrement"}
            idIncrement={"break-increment"}
            idLength={"break-length"}
            startStop={startStop}
            reboot={reboot}
            setReboot={setReboot}
            updateValuesT={updateValueT}
            title={"Break Length"}
            value={breakLength}
            timeLeft={timeLeft}
          />
        </div>
        <div className="col">
          <ControlSession
            // handlerTimeLeft={true}
            handlerSelectorTime={false}
            idLabel={"session-label"}
            idDecrement={"session-decrement"}
            idIncrement={"session-increment"}
            idLength={"session-length"}
            startStop={startStop}
            reboot={reboot}
            setReboot={setReboot}
            updateValuesT={updateValue}
            updateValues={updateValue}
            title={"Session Length"}
            value={sessionLength}
            timeLeft={timeLeft}
          />
        </div>
        <div className="border border-5 rounded-pill">
          <Timer
            hour={timeLeft.hours == 1 ? true : false}
            value={getTimeLeft(timeLeft)}
          />
        </div>
        <div className="row">
          <div className="col">
            <button
              onClick={startStopOnClick}
              className="btn btn-info"
              id="start_stop"
            >
              <i class="bi bi-play-fill"></i>
              <i class="bi bi-pause-fill"></i>
            </button>
          </div>
          <div className="col">
            <button
              onClick={rebootTimeLeft}
              className="btn btn-info"
              id="reset"
            >
              <i class="bi bi-arrow-repeat"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
