import React from "react";
import Home from "./pages/Home.jsx";
import Analytics from "./pages/Analytics.jsx";
import AdvanceAnalytics from "./pages/AdvanceAnalytics.jsx";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/analytics/advance" element={<AdvanceAnalytics />} />
      </Routes>
    </Router>
  );
};

export default App;
