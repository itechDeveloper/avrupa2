import React, { useState } from "react";

import database from "../Helpers/Firebase.js";
import { ref, set, update } from "firebase/database";

function FolderModal({ data, set_data }) {
  let temp_data = data;

  const [folder_name, set_folder_name] = useState();
  function insertFolder() {
    handleTempData();
    if (data.length == 0) {
      set(ref(database(), "folders/"), {
        data: temp_data,
      })
        .then(() => {
          console.log("success");
        })
        .catch((error) => {
          console.log("error: " + error);
        });
    } else {
      update(ref(database(), "folders/"), {
        data: temp_data,
      })
        .then(() => {
          console.log("success");
        })
        .catch((error) => {
          console.log("error: " + error);
        });
    }

    set_data(temp_data);
  }
  function handleTempData() {
    temp_data[temp_data.length + 1] = { folder_name: folder_name };
  }

  return (
    <div
      className="modal fade"
      id="exampleModal"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">
              Dosya Oluştur
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <input
              type="text"
              placeholder="Bu alana dosya adını giriniz"
              className="form-control"
              onChange={(e) => set_folder_name(e.target.value)}
            />
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
              data-bs-dismiss="modal"
              onClick={() => insertFolder()}
            >
              Kaydet
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FolderModal;
