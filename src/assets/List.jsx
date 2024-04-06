import React from "react";
import { Link } from "react-router-dom";

function List({
  date,
  avgtemp_f,
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
      <h6 className="date">{date}</h6>
      <h6 className="avg">{avgtemp_f.toFixed(1)}°F</h6>
      <h6 className="r">{rain > 0 ? rain : "00"}%</h6>
      <h6 className="sr">{sunrise}</h6>
      <h6 className="ss">{sunset}</h6>
      <h6 className="moon-phase mmoon">{padString(moon_phase, 16)}</h6>
      <h6 className="condition cond">{padString(condition, 20)}</h6>
      <h6 className="link">
        <Link to={`/details/${date}`} className="list-link">
          {"🔗"}
        </Link>
      </h6>
    </div>
  );
}

export default List;
