// import logo from './logo.svg';
import "./App.scss";
import ControlSession from "./component/ControlSession.jsx";
import Timer from "./component/Timer.jsx";
function App() {
  return (
    <div className="App ">
      <header className="">
        <h1>25 + 5 Clock</h1>
      </header>
      <div className="row w-50">
        <div className="col">
          <ControlSession title={"Break Length"} value={5} />
        </div>
        <div className="col">
          <ControlSession title={"Session Length"} value={25} />
        </div>
        <div className="border border-5 rounded-pill">
          <Timer value={0} />
        </div>
        <div className="row">
          <div className="col">
            <button className="btn btn-info" id="start_stop">
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
