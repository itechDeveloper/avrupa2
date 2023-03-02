import "./App.css";
import { Route, Routes } from "react-router-dom";
import React from "react";
import PDF from "./Pages/PDF";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<PDF />} />
      </Routes>
    </div>
  );
}

export default App;
