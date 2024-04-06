import React from "react";
import { Link } from "react-router-dom";

function List({
  date,
  avgtemp_f,
  maxtemp_f,
  mintemp_f,
  condition,
  rain,
  sunrise,
  sunset,
  moon_phase,
}) {
  function padString(str, length) {
    const spacesToAdd = length - str.length;
    if (spacesToAdd > 0) {
      return str + " ".repeat(spacesToAdd);
    } else {
      return str;
    }
  }

  return (
    <div className="days">
      <h6>{date}</h6>
      <h6>{avgtemp_f.toFixed(1)}°F</h6>
      <h6>{maxtemp_f.toFixed(1)}°F</h6>
      <h6>{mintemp_f.toFixed(1)}°F</h6>
      <h6>{rain > 0 ? rain : "00"}%</h6>
      <h6>{sunrise}</h6>
      <h6>{sunset}</h6>
      <h6 className="moon-phase">{padString(moon_phase, 16)}</h6>
      <h6 className="condition">{padString(condition, 20)}</h6>
      <Link to={`/details/${date}`} className="list-link">
        {"🔗"}
        {/* Link to the details page */}
      </Link>
    </div>
  );
}

export default List;
