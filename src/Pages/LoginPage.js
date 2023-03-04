import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/LoginStyle.css";

function LoginPage() {
  const navigator = useNavigate();
  const password = "8;5p.$6SWk4SjCW";
  const [input, set_input] = useState();
  function login() {
    if (input == password) navigator("/folders");
  }

  return (
    <div className="login-container">
      <form>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Parola
          </label>
          <input
            type="password"
            className="form-control"
            onChange={(e) => set_input(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary" onClick={login}>
          GİRİŞ
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
