import React, { useState, useEffect } from "react";
import axios from "axios";
import "../App.css";
import { useParams } from "react-router-dom";
import HourlyList from "./HourlyList";

function DetailsPage() {
  const { date } = useParams();
  const [detailsData, setDetailsData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Make an API call to fetch the current day's details
        const response = await axios.get(
          `http://api.weatherapi.com/v1/forecast.json?key=258ca2f115cb4af1997192108242903&q=Paris&days=14`
        );

        // Filter the forecast data to get details for the specific date
        const currentDayDetails = response.data.forecast.forecastday.find(
          (day) => day.date === date
        );
        console.log(currentDayDetails);

        // Set the details data
        setDetailsData(currentDayDetails);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [date]);

  return (
    <div className="hourlyMain">
      <div className="containerWeather">
        <div className="weatherCard">
          <h2>Details for Date: {date}</h2>
          {/* Display details data here */}
          {detailsData && detailsData.day && (
            <div>
              <p>Average Humidity: {detailsData.day.avghumidity}</p>
              <p>Average Temperature (F): {detailsData.day.avgtemp_f} °F</p>
              <p>Average Visibility (miles): {detailsData.day.avgvis_miles}</p>
              <p>
                Daily Chance of Rain: {detailsData.day.daily_chance_of_rain}
              </p>
              <p>
                Daily Chance of Snow: {detailsData.day.daily_chance_of_snow}
              </p>
              <p>Daily Will it Rain: {detailsData.day.daily_will_it_rain}</p>
              <p>Daily Will it Snow: {detailsData.day.daily_will_it_snow}</p>
              <p>Max Temperature (F): {detailsData.day.maxtemp_f} °F</p>
              <p>Max Wind Speed (mph): {detailsData.day.maxwind_mph}</p>
              <p>Min Temperature (F): {detailsData.day.mintemp_f} °F</p>
              <p>Total Precipitation (in): {detailsData.day.totalprecip_in}</p>
              <p>UV Index: {detailsData.day.uv}</p>
            </div>
          )}
        </div>
      </div>
      <div className="hourlycont">
        <div className="hourly">
          <h2>Hourly Data for {date}</h2>
          <div className="hourlybar">
            <h6 className="htime">Time</h6>
            <h6 className="havg">Temperature (°F)</h6>
            <h6 className="hfl">Feels Like (°F)</h6>
            <h6 className="hgust">Gust (mph)</h6>
            <h6 className="hhumidity">Humidity</h6>
            <h6 className="hpressure">Pressure</h6>
            <h6 className="hvis">Visibility</h6>
            <h6 className="hwindir">Wind Direction</h6>
            <h6 className="hwinspd">Wind Speed (mph)</h6>
            <h6 className="hwindchl">Wind Chill</h6>
          </div>
          {detailsData.hour &&
            detailsData.hour.map((d, index) => (
              <HourlyList
                key={index}
                time={d.time}
                temp={d.temp_f}
                feelsLike={d.feelslike_f}
                gust={d.gust_mph}
                humidity={d.humidity}
                pressure={d.pressure_in}
                visibility={d.vis_miles}
                windDir={d.wind_dir}
                windSpd={d.wind_mph}
                windChl={d.windchill_f}
              ></HourlyList>
            ))}
        </div>
      </div>
    </div>
  );
}
export default DetailsPage;
