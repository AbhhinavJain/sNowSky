import React, { useState } from "react";
import Footer from "./Footer";
import Forecast from "./Forecast";

function Weather() {
  const [location, setlocation] = useState({});
  const [current, setcurrent] = useState({});
  const [forecastday, setforecastday] = useState([]);
  const [place, setPlace] = useState("");
  const [error, setError] = useState(null);
  // const [suggestplace, setSuggestplace] = useState([])
  const updateWeather = async () => {
    const url = `http://api.weatherapi.com/v1/forecast.json?key=eedbfecd9f544e0ba4c165656222207&q=${place}&days=3&aqi=no&alerts=no`;
    try {
      let data = await fetch(url);
      let parsedData = await data.json();
      setlocation(parsedData.location);
      setforecastday(parsedData.forecast.forecastday);
      setcurrent(parsedData.current);
    } catch (error) {
      setError("No matching location found.");
    }
  };
  const onSubmit = (e) => {
    e.preventDefault();
    updateWeather();
    // console.log(suggestplace);
    // console.log(place);
  };
  return (
    <>
      <div className="container my-3">
        {
          <div>
            <form onSubmit={onSubmit}>
              <div className="mb-3" style={{ width: "350px", margin: "auto" }}>
                <label htmlFor="exampleFormControlInput1"className="form-label"></label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleFormControlInput1"
                  placeholder="Choose Your Location"
                  onChange={(event) => setPlace(event.target.value)} />
              </div>
              <div className="text-center">
                <button className="btn btn-primary" type="submit">
                  Show
                </button>
              </div>
            </form>
          </div>
        }
        {error !== null ? (<div className="text-center my-3">{error}</div>) : (
          <>
            <div className="text-center my-3">
              <h2>{location.name}</h2>
            </div>
            <>
              <div  style={{ display: "flex", width: "fit-content", margin: "auto", }}>
                    <p style={{ fontSize: "7rem" }}>
                        {current.temp_c}
                    </p>
                    {
                        Object.keys(location).length !== 0 && (
                        <>
                            <p style={{ paddingTop: "35px", fontSize: "larger" }}>
                                &#8451;
                            </p>
                        </>
                        )
                    }
              </div>
              {
                Object.keys(location).length !== 0 && (
                <div className="text-center">
                  <p style={{ display: "inline-block" }}>
                    {current.condition.text}
                  </p>
                  <img
                    src={current.condition.icon}
                    alt={current.condition.text}
                  ></img>
                  <p>
                    <span className="badge rounded-pill bg-secondary">
                      wind {current.wind_kph} kmph
                    </span>
                  </p>
                  <hr />
                </div>
              )}
            </>
            {Object.keys(location).length !== 0 && (
              <>
                <h2 className="text-center"> Forecast of 3 days</h2>
              </>
            )}
            <div className="row my-3" style={{ margin: "auto" }}>
              {forecastday.map((element) => {
                return (
                  <div className="col my-3" key={element.date_epoch}>
                    <Forecast
                      date={element.date}
                      maxtemp={element.day.maxtemp_c}
                      mintemp={element.day.mintemp_c}
                      text={element.day.condition.text}
                      icon={element.day.condition.icon}
                      sunrise={element.astro.sunrise}
                      sunset={element.astro.sunset}
                    />
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>

      {Object.keys(location).length !== 0 && (
        <div>
          <Footer />
        </div>
      )}
    </>
  );
}

export default Weather;
