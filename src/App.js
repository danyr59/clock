import ControlSession from "./component/ControlSession.jsx";
import Timer from "./component/Timer.jsx";
import "./App.scss";
import React, { useState, useEffect } from "react";
Date.prototype.getFormatMinSecond = function () {
  let format = this.toLocaleTimeString();
  return this.getHours() == 1 ? "60:00" : format.slice(3);
};
Date.prototype.setFormatMinSecond = function (min, seg) {
  this.setMinutes(min, seg);
};
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
const getDate = function ({
  hours: hours = 0,
  minutes: minutes,
  seconds: seg,
  ms: ms,
}) {
  //402 ms tiempo de retrazo producido
  // console.log(minutes, seg, ms);
  const difference =
    hours * 60 * 60 * 1000 + minutes * 60 * 1000 + seg * 1000 + ms + 402;
  return new Date(+new Date() + difference);
};
function App() {
  const [date, setDate] = useState(getDate({ minutes: 25, seconds: 0, ms: 0 }));
  const [timeLeft, setTimeLeft] = useState(inizializeTimeLeft(25));
  const [startStop, setStartStop] = useState(false);
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [reboot, setReboot] = useState(false);
  const [timerLabel, setTimerLabel] = useState("Session");
  const audioBeep = document.getElementById("beep");
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
  function buzzer(timer) {
    if (timer == 0) {
      audioBeep.play();
    }
  }
  function rebootTimeLeft() {
    setReboot(true);
    setStartStop(false);
    setDate(getDate({ minutes: 25, seconds: 0, ms: 0 }));
    setTimeLeft(inizializeTimeLeft(25));
    setBreakLength(5);
    setSessionLength(25);
    setTimerLabel("Session");
    if (audioBeep) {
      audioBeep.pause();
      audioBeep.currentTime = 0;
    }
  }
  function updateValue(value) {
    setDate(
      value == 60
        ? getDate({ hours: value, minutes: 0, seconds: 0, ms: 0 })
        : getDate({ minutes: value, seconds: 0, ms: 0 })
    );
    setTimeLeft(inizializeTimeLeft(value));
  }
  function isZero() {
    if (timeLeft.hours != 1 && timeLeft.minutes == 0 && timeLeft.seconds == 0) {
      buzzer(0);
      return true;
    }
    return false;
  }
  return (
    <div className="App">
      <div className="container-md">
        <header className="row mb-3">
          <h1 className="col-sm">25 + 5 Clock</h1>
        </header>
        <div className="row row-cols-auto justify-content-center gy-4">
          <div className="col ">
            <ControlSession
              idLabel={"break-label"}
              idDecrement={"break-decrement"}
              idIncrement={"break-increment"}
              idLength={"break-length"}
              title={"Break Length"}
              setTimerLabel={setTimerLabel}
              timerLabel={"break"}
              zero={isZero()}
              handlerSelectorTime={false}
              startStop={startStop}
              reboot={reboot}
              setReboot={setReboot}
              updateValues={updateValue}
              value={breakLength}
              timeLeft={timeLeft}
            />
          </div>
          <div className="col ">
            <ControlSession
              idLabel={"session-label"}
              idDecrement={"session-decrement"}
              idIncrement={"session-increment"}
              idLength={"session-length"}
              title={"Session Length"}
              setTimerLabel={setTimerLabel}
              timerLabel={"Session"}
              zero={isZero()}
              handlerSelectorTime={true}
              startStop={startStop}
              reboot={reboot}
              setReboot={setReboot}
              updateValues={updateValue}
              value={sessionLength}
              timeLeft={timeLeft}
            />
          </div>
        </div>
        <div className="row row-cols-auto mt-3 justify-content-center">
          <div className="col">
            <div className="border border-4 rounded mt-3 mb-3 p-5">
              <Timer timerLabel={timerLabel} value={getTimeLeft(timeLeft)} />
            </div>
          </div>
        </div>
        <div className="row row-cols-auto mt-1 justify-content-center">
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
        <audio
          id="beep"
          preload="auto"
          src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
        />
      </div>
    </div>
  );
}

export default App;
