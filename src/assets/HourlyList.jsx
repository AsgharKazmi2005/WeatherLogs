import React from "react";
import { Link } from "react-router-dom";

function HourlyList({
  time,
  temp,
  feelsLike,
  gust,
  humidity,
  pressure,
  visibility,
  windDir,
  windSpd,
  windChl,
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
    <div className="hours">
      <h6 className="htime">{time}</h6>
      <h6 className="htemp">{temp.toFixed(1)}°F</h6>
      <h6 className="hfl">{feelsLike.toFixed(1)}</h6>
      <h6 className="hgust">{gust.toFixed(1)}</h6>
      <h6 className="hhumidity">{humidity.toFixed(1)}</h6>
      <h6 className="hpressure">{pressure.toFixed(1)}</h6>
      <h6 className="hvis">{visibility}</h6>
      <h6 className="hwindir">{windDir}</h6>
      <h6 className="hwindspd">{windSpd.toFixed(1)}</h6>
      <h6 className="hwindchl">{windChl}</h6>
    </div>
  );
}

export default HourlyList;
