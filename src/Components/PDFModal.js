import React, { useState } from "react";
import "../Styles/GeneralStyle.css";

function PDFModal({ options, setBlokBill }) {
  const [title, set_title] = useState("Blok Seçiniz");
  const [bill, set_bill] = useState();
  function getBlockIndex() {
    for (let i = 0; i < options.length; i++) {
      if (options[i].blok == title) {
        return i;
      }
    }
  }
  function handleSaveOperation() {
    setBlokBill(getBlockIndex(), bill);
  }

  return (
    <div
      className="modal fade"
      id="staticBackdrop"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="staticBackdropLabel">
              Blok Doğalgaz Faturası
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <div className="dropdown">
              <a
                className="btn btn-secondary dropdown-toggle width-100 text-left"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {title}
              </a>
              <ul className="dropdown-menu width-100">
                {options.map((value, index) => (
                  <li key={"key-" + index}>
                    <a
                      className="dropdown-item"
                      href="#"
                      onClick={() => set_title(value.blok)}
                      key={"key-" + index}
                    >
                      {value.blok}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="input-group mb-3 margin-top-10">
              <input
                type="number"
                min={0}
                className="form-control"
                placeholder="Doğalgaz Faturası"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
                value={bill ? bill : ""}
                onChange={(e) => set_bill(e.target.value)}
              />
              <span className="input-group-text" id="basic-addon2">
                ₺
              </span>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Kapat
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSaveOperation}
              data-bs-dismiss="modal"
            >
              Kaydet
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PDFModal;
