function Card({ place, temp, condition, img }) {
  return (
    <div className="cards">
      <div className="card">
        <h1>Location</h1>
        <h2>{place}</h2>
      </div>
      <div className="card">
        <h1>Temperature</h1>
        <h2>{temp}°F</h2>
      </div>
      <div className="card">
        <h1>Weather</h1>
        <h2>{condition}</h2>
      </div>
    </div>
  );
}

export default Card;
