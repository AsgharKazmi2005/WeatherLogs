import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import DetailsPage from "./assets/DetailsPage.jsx";
import MainContent from "./assets/MainContent.jsx";

function App() {
  return (
    <div className="main">
      <Routes>
        <Route path="/" element={<MainContent></MainContent>} />
        <Route path="/details/:date" element={<DetailsPage />} />
      </Routes>
    </div>
  );
}

export default App;
