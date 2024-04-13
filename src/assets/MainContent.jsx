import React, { useState, useEffect } from "react";
import "../App.css";
import Header from "./Header";
import Card from "./Card";
import List from "./List";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { RainBar } from "./Rainbar.jsx";
import Pies from "./Pies.jsx";
import DetailsPage from "./DetailsPage.jsx";
import Temp from "./Temp.jsx";

function MainContent() {
  const [currentFetch, setCurrentFetch] = useState({});
  const [cardData, setCardData] = useState({
    place: "",
    temp: "",
    condition: "",
    img: "",
  });
  const [forecast, setForecast] = useState([]);
  const [city, setCity] = useState("");
  const [days, setDays] = useState("");
  const [isRainyDay, setIsRainyDay] = useState(false);
  const [moonPhaseFilter, setMoonPhaseFilter] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [rainData, setRainData] = useState([]);
  const [tempData, setTempData] = useState([]);
  const [weather, setWeatherData] = useState({});
  const [showRainBar, setShowRainBar] = useState(false);
  const [showPies, setShowPies] = useState(false);
  const [showTemp, setShowTemp] = useState([]);

  const fetchData = async (city, days) => {
    try {
      const response = await axios.get(
        `http://api.weatherapi.com/v1/forecast.json?key={KEY_HERE}&q=${city}&days=${days}`
      );
      console.log(response.data);
      setCurrentFetch(response.data);
      setForecast(response.data.forecast.forecastday);
      setCardData({
        place: response.data.location.name,
        temp: String(response.data.current.temp_f),
        condition: response.data.current.condition.text,
        img: response.data.current.condition.icon,
      });

      // RAIN
      const rainFilter = response.data.forecast.forecastday.map((day) => ({
        date: day.date,
        rain: day.day.daily_chance_of_rain,
      }));
      setRainData(rainFilter);

      const tempFilter = response.data.forecast.forecastday.map((day) => ({
        date: day.date,
        Average: day.day.avgtemp_f,
        High: day.day.maxtemp_f,
        Low: day.day.mintemp_f,
      }));
      setTempData(tempFilter);

      // Function to count occurrences of each weather type
      const countWeatherOccurrences = (data) => {
        // Initialize an object to store weather type occurrences
        const weatherCounts = {};

        // Loop through each day's data
        data.forEach((day) => {
          const weatherType = day.day.condition.text;
          // Increment the count for the current weather type
          weatherCounts[weatherType] = (weatherCounts[weatherType] || 0) + 1;
        });

        setWeatherData(weatherCounts);
      };

      countWeatherOccurrences(response.data.forecast.forecastday);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const submit = () => {
    fetchData(city, days);
  };

  useEffect(() => {
    fetchData("Paris", 14);
  }, []);

  useEffect(() => {
    // Do not fetch data when the component mounts
    if (city && days) {
      // Fetch data only when both city and days are set
      fetchData(city, days);
    }
  }, [city, days]);

  const filterForecast = () => {
    return forecast.filter((day) => {
      if (isRainyDay && day.day.daily_chance_of_rain === 0) {
        return false;
      }

      if (moonPhaseFilter) {
        const selectedMoonPhase = moonPhaseFilter.trim().toLowerCase();
        const dayMoonPhase = day.astro.moon_phase.trim().toLowerCase();
        if (!dayMoonPhase.includes(selectedMoonPhase)) {
          return false;
        }
      }

      if (selectedDate && day.date !== selectedDate) {
        return false;
      }

      return true;
    });
  };

  const filteredForecast = filterForecast();

  const toggleRainBar = () => {
    setShowRainBar(!showRainBar);
    setShowPies(false);
    setShowTemp(false);
  };

  const togglePies = () => {
    setShowPies(!showPies);
    setShowRainBar(false);
    setShowTemp(false);
  };

  const toggleTemp = () => {
    setShowTemp(!showTemp);
    setShowPies(false);
    setShowRainBar(false);
  };

  return (
    <>
      <div className="cardcont">
        <div className="search">
          <div>
            <h3>Search for any city: </h3>
            <input
              value={city}
              onChange={(e) => setCity(e.target.value)}
            ></input>
          </div>
          <div>
            <h3>Number of days:</h3>
            <input
              value={days}
              onChange={(e) => setDays(e.target.value)}
            ></input>
          </div>
          <button onClick={submit}>Submit</button>
        </div>
        <Card
          place={cardData.place}
          temp={cardData.temp}
          condition={cardData.condition}
          img={cardData.img}
        ></Card>
        <div className="filter">
          <div>
            <label>
              <input
                type="checkbox"
                checked={isRainyDay}
                onChange={() => setIsRainyDay(!isRainyDay)}
              />
              Rainy Days Only
            </label>
          </div>
          <div>
            <select
              value={moonPhaseFilter}
              onChange={(e) => setMoonPhaseFilter(e.target.value)}
            >
              <option value="">Select Moon Phase</option>
              <option value="New Moon">New Moon</option>
              <option value="First Quarter">First Quarter</option>
              <option value="Full Moon">Full Moon</option>
              <option value="Last Quarter">Last Quarter</option>
              <option value="Waning Gibbous">Waning Gibbous</option>
              <option value="Waxing Gibbous">Waxing Gibbous</option>
              <option value="Waning Crescent">Waning Crescent</option>
              <option value="Waxing Crescent">Waxing Crescent</option>
            </select>
          </div>
          <div>
            <input
              placeholder="Enter Date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
          </div>
        </div>
        <div className="datacont">
          <div className="dayscont">
            <div className="titlebar">
              <h6 className="date">Date</h6>
              <h6 className="avg">Avg (°F)</h6>
              <h6 className="r">Rain%</h6>
              <h6 className="sr">Sunrise</h6>
              <h6 className="ss">Sunset</h6>
              <h6 className="mmoon">Moon Phase</h6>
              <h6 className="cond">Condition</h6>
              <h6 className="link">Details</h6>
            </div>
            {filteredForecast.map((d, index) => (
              <List
                key={index}
                date={d.date}
                avgtemp_f={d.day.avgtemp_f}
                condition={d.day.condition.text}
                rain={d.day.daily_chance_of_rain}
                sunrise={d.astro.sunrise}
                sunset={d.astro.sunset}
                moon_phase={d.astro.moon_phase}
              >
                <Link to={`/details/${d.date}`}>Details</Link>
              </List>
            ))}
          </div>
          <div className="graphs">
            <div className="buttons">
              <button className={showTemp ? "active" : ""} onClick={toggleTemp}>
                Temperature
              </button>
              <button
                className={showRainBar ? "active" : ""}
                onClick={toggleRainBar}
              >
                Rain Chance
              </button>
              <button className={showPies ? "active" : ""} onClick={togglePies}>
                Weather
              </button>
            </div>
            <div className="rain">
              <div className="temp">
                {showTemp && <Temp data={tempData}></Temp>}
              </div>
              {showRainBar && <RainBar data={rainData}></RainBar>}
            </div>
            <div className="weather">
              {showPies && <Pies data={weather}></Pies>}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MainContent;
