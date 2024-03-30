import { useState, useEffect } from "react";
import "./App.css";
import Header from "./assets/Header";
import Card from "./assets/Card";
import List from "./assets/List";
import axios from "axios";

function App() {
  const [currentFetch, setCurrentFetch] = useState({});
  const [cardData, setCardData] = useState({
    place: "",
    temp: "",
    condition: "",
    img: "",
  });
  const [forecast, setForecast] = useState([]);
  const [city, setCity] = useState(""); // State for city input
  const [days, setDays] = useState(""); // State for number of days input
  const [isRainyDay, setIsRainyDay] = useState(false); // State for rainy day filter
  const [moonPhaseFilter, setMoonPhaseFilter] = useState(""); // State for moon phase filter
  const [selectedDate, setSelectedDate] = useState(""); // State for selected date

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
      // Apply rainy day filter
      if (isRainyDay && day.day.daily_chance_of_rain === 0) {
        return false;
      }

      // Apply moon phase filter
      if (moonPhaseFilter) {
        const selectedMoonPhase = moonPhaseFilter.trim().toLowerCase();
        const dayMoonPhase = day.astro.moon_phase.trim().toLowerCase();
        if (!dayMoonPhase.includes(selectedMoonPhase)) {
          return false;
        }
      }

      // Apply date filter
      if (selectedDate && day.date !== selectedDate) {
        return false;
      }

      return true;
    });
  };

  const filteredForecast = filterForecast();
  return (
    <div className="main">
      <div className="head">
        <Header className="header"></Header>
      </div>
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
        <div className="dayscont">
          <div className="days titlebar">
            <h6>
              Date
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;
            </h6>
            <h6>Avg Temp (°F)</h6>
            <h6>High (°F)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</h6>
            <h6>Low (°F)</h6>
            <h6>Rain Chance&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</h6>
            <h6>
              Sunrise&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </h6>
            <h6>
              Sunset&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;
            </h6>
            <h6>
              Moon
              Phase&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </h6>
            <h6>Condition</h6>
          </div>
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
            ></List>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
