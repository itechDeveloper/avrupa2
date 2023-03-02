import React from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigator = useNavigate();
  function openPage(url) {
    navigator(url);
  }
  return (
    <nav className="navbar bg-body-tertiary fixed-top">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          AVRUPA KONUTLARI 2
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasNavbar"
          aria-controls="offcanvasNavbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="offcanvas offcanvas-end"
          tabIndex="-1"
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
        >
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
              AVRUPA KONUTLARI 2
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div className="offcanvas-body">
            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
              <li className="nav-item" onClick={() => openPage("/folders")}>
                <a className="nav-link" aria-current="page" href="#">
                  KLASÖRLER
                </a>
              </li>
              <li className="nav-item" onClick={() => openPage("/pdf")}>
                <a className="nav-link" href="#">
                  PDF
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
