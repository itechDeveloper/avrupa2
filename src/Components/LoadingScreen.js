import React from "react";
import Loader from "react-spinners/ScaleLoader";
import "../Styles/LoadingScreenStyle.css";

function LoadingScreen({ message }) {
  return (
    <div className="container">
      <div className="loading-container">
        {message && <label>{message}</label>}
        <Loader
          className="loading-spinner"
          color="red"
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    </div>
  );
}

export default LoadingScreen;
