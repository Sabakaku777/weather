import "./App.css";
import weather from "../public/images/weather.png";
import { useState, useEffect } from "react";

function App() {
  const [step, setStep] = useState(1);
  const [query, setQuery] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const Key = "a0123ddf39c7274a66cbcb3cade023f1";

  async function getData() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${Key}`
      );

      if (!res.ok) {
        throw new Error("Please Enter real city");
      }
      const data = await res.json();
      if (data.cod !== 200) {
        throw new Error(data.message);
      }
      setWeatherData(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="main">
      {step === 1 ? (
        <Welcome setStep={setStep} />
      ) : step === 2 ? (
        <SignUp setStep={setStep} />
      ) : step === 3 ? (
        <Weather
          setQuery={setQuery}
          query={query}
          getData={getData}
          weatherData={weatherData}
          loading={loading}
          error={error}
        />
      ) : (
        ""
      )}
    </div>
  );
}

function Welcome({ setStep }) {
  return (
    <div className="container">
      <div>
        <img src={weather} className="image" alt="Weather" />
      </div>
      <div className="title">
        <h1 className="weathertitle">Weather</h1>
        <h1 className="created">ByKaku</h1>
      </div>
      <div>
        <button className="started" onClick={() => setStep(2)}>
          Get Start
        </button>
      </div>
    </div>
  );
}

function SignUp({ setStep }) {
  return (
    <div className="signup">
      <div>
        <img
          src={weather}
          className="image"
          alt="Weather"
          onClick={() => setStep(1)}
        />
      </div>
      <div className="inputs">
        <div>
          <input placeholder="First name and last name" />
        </div>
        <div>
          <input placeholder="Email" />
        </div>
        <div>
          <input placeholder="Phone Number" />
        </div>
        <div>
          <input placeholder="Country" />
        </div>
        <div>
          <input placeholder="Password" type="password" />
        </div>
      </div>
      <button className="sign" onClick={() => setStep(3)}>
        Sign Up
      </button>
    </div>
  );
}

function Weather({ setQuery, query, getData, weatherData, loading, error }) {
  return (
    <div className="box">
      <div className="search">
        <div>
          <input
            type="text"
            placeholder="Search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div>
          <i className="fa-solid fa-magnifying-glass" onClick={getData}></i>
        </div>
      </div>
      <div>
        <img src={weather} className="img" alt="Weather" />
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className="error"> {error}</div>
      ) : weatherData ? (
        <div className="celsius">
          <h1>{(weatherData.main.temp - 273.15).toFixed(2)} °C</h1>
          <h1>{weatherData.name}</h1>
        </div>
      ) : (
        <div>No data available</div>
      )}
      <div className="footer">
        <div>
          <i className="fa-solid fa-braille"></i>
          <span>{weatherData ? `${weatherData.main.humidity} %` : "--"}</span>
          <h4>Humidity</h4>
        </div>
        <div>
          <i className="fa-solid fa-wind"></i>
          <span>{weatherData ? `${weatherData.wind.speed} Km/h` : "--"}</span>
          <h4>Wind Speed</h4>
        </div>
      </div>
    </div>
  );
}

export default App;
