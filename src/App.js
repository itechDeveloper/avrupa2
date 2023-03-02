import "./App.css";
import { Route, Routes } from "react-router-dom";
import React from "react";

import LoginPage from "./Pages/LoginPage";
import FoldersPage from "./Pages/FoldersPage";
import PDFPage from "./Pages/PDFPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<LoginPage />} />
        <Route exact path="/folders" element={<FoldersPage />} />
        <Route exact path="/pdf" element={<PDFPage />} />
      </Routes>
    </div>
  );
}

export default App;
