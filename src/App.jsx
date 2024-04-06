import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "./assets/Header";
import Card from "./assets/Card";
import List from "./assets/List";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { RainBar } from "./assets/Rainbar.jsx";
import Pies from "./assets/Pies.jsx";
import DetailsPage from "./assets/DetailsPage.jsx";

function App() {
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
  const [weather, setWeatherData] = useState({});

  const fetchData = async (city, days) => {
    try {
      const response = await axios.get(
        `http://api.weatherapi.com/v1/forecast.json?key=258ca2f115cb4af1997192108242903&q=${city}&days=${days}`
      );
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

  return (
    <Routes>
      {/* Route for the DetailsPage */}
      <Route path="/details/:date" element={<DetailsPage />} />
      {/* Route for the default content */}
      <Route path="/" element={<DefaultContent />} />
    </Routes>
  );

  function DefaultContent() {
    return (
      <div className="main">
        <Header className="header" />
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
              <div className="days titlebar">
                <h6>Date&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</h6>
                <h6>Avg (°F)</h6>
                <h6>High (°F)</h6>
                <h6>Low (°F)</h6>
                <h6>Rain%</h6>
                <h6>Sunrise</h6>
                <h6>Sunset</h6>
                <h6>
                  Moon Phase&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </h6>
                <h6>Condition</h6>
              </div>
              {/* Render the default content */}
              {filteredForecast.map((d, index) => (
                <List
                  key={index}
                  date={d.date}
                  avgtemp_f={d.day.avgtemp_f}
                  maxtemp_f={d.day.maxtemp_f}
                  mintemp_f={d.day.mintemp_f}
                  condition={d.day.condition.text}
                  rain={d.day.daily_chance_of_rain}
                  sunrise={d.astro.sunrise}
                  sunset={d.astro.sunset}
                  moon_phase={d.astro.moon_phase}
                />
              ))}
            </div>
            <div className="graphs">
              <div className="rain">
                <RainBar data={rainData}></RainBar>
              </div>
              <div className="weather">
                <Pies data={weather}></Pies>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
