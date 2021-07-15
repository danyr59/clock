// import logo from './logo.svg';
import "./App.scss";
import ControlSession from "./component/ControlSession.jsx";
import Timer from "./component/Timer.jsx";
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
const inizializeTimeLeft = (length) => {
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
const getDate = function (timeLeft) {
  const difference = timeLeft * 60 * 1000;
  return new Date(+new Date() + difference);
};
function App() {
  const [date, setDate] = useState(getDate(25));
  const [timeLeft, setTimeLeft] = useState(inizializeTimeLeft(25));
  const [startStop, setStartStop] = useState(false);
  const calculateTimeLeft = () => {
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
  }
  useEffect(() => {
    if (startStop) {
      const timer = setTimeout(() => {
        setTimeLeft(calculateTimeLeft());
      }, 1000);
      return () => clearTimeout(timer);
    }
    // Clear timeout if the component is unmounted
  });
  return (
    <div className="App ">
      <header className="">
        <h1>25 + 5 Clock</h1>
      </header>
      <div className="row w-50">
        <div className="col">
          <ControlSession
            id={"break-label"}
            title={"Break Length"}
            value={5}
            idDecrement={"break-decrement"}
            idIncrement={"break-increment"}
            idLabel={"break-length"}
          />
        </div>
        <div className="col">
          <ControlSession
            id={"session-label"}
            title={"Session Length"}
            value={25}
            idDecrement={"session-decrement"}
            idIncrement={"session-increment"}
            idLabel={"session-length"}
          />
        </div>
        <div className="border border-5 rounded-pill">
          <Timer value={getTimeLeft(timeLeft)} />
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
            <button className="btn btn-info" id="reset">
              <i class="bi bi-arrow-repeat"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
