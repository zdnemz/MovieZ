import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/index";
import Movie from "./pages/movie";
import Result from "./pages/movie/result";
import NoPage from "./components/elements/NoPage";
import Credits from "./pages/movie/credits";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Router>
      <Routes>
        {/* Home page */}
        <Route path="/" element={<Home />} />

        {/* Movie page */}
        <Route path="/movie/:id" element={<Movie />} />
        <Route path="/movie/:id/credits" element={<Credits />} />

        {/* Search */}
        <Route path="/search/q?" element={<Result />} />

        {/* No page */}
        <Route path="*" element={<NoPage />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
