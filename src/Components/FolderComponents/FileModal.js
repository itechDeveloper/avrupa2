import React, { useState } from "react";

import Firebase from "../../Helpers/Firebase";
import { ref, update } from "firebase/database";
import CloudHelper from "../../Helpers/CloudHelper";
import LoadingScreen from "../LoadingScreen";

function FileModal({ data, set_show, folder_name }) {
  const [file, set_file] = useState();
  const [file_title, set_file_title] = useState();
  const [file_description, set_file_description] = useState();
  const [file_name, set_file_name] = useState();

  const [show_loading_page, set_show_loading_page] = useState(false);

  function fileHandler(event) {
    const file = event.target.files[0];
    if (file) {
      set_file(file);
      set_file_name(file.name);
    }
  }

  async function insertData() {
    set_show_loading_page(true);

    // get database
    const database = Firebase().database;

    // upload to cloud
    await CloudHelper.uploadFile(file, file_name, folder_name);

    // get data
    let mData = handleData();

    // add
    update(ref(database, "data/"), {
      folders: mData,
    })
      .then(() => window.location.reload())
      .catch((error) => console.log(error));

    set_show_loading_page(false);
  }

  function handleData() {
    let temp = data;
    for (let i = 0; i < temp.length; i++) {
      if (temp[i].folder_name == folder_name) {
        if (temp[i].files) {
          temp[i].files[temp[i].files.length + 1] = {
            file_title: file_title,
            file_description: file_description,
            file_name: file_name,
          };
        } else {
          temp[i] = {
            folder_name: folder_name,
            files: [
              {
                file_title: file_title,
                file_description: file_description,
                file_name: file_name,
              },
            ],
          };
        }
      }
    }
    return temp;
  }

  return (
    <div className="modal show">
      {show_loading_page && (
        <LoadingScreen
          message={"Dosyanız cloud'a yükleniyor. Lütfen bekleyiniz.."}
        />
      )}
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5">DOSYA EKLE</h1>
            <button
              type="button"
              className="btn-close"
              onClick={() => set_show(false)}
            ></button>
          </div>
          <div className="modal-body">
            <div className="mb-3">
              <label className="form-label">Dosya Başlığı</label>
              <input
                type="text"
                className={
                  file_title
                    ? "form-control is-valid"
                    : "form-control is-invalid"
                }
                onChange={(e) => set_file_title(e.target.value)}
              />
              <div className="form-text">
                Dosya başlığı, dosyanın kısaltılmış açıklaması niteliğindedir.
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label">Dosya Açıklaması</label>
              <textarea
                className={
                  file_description
                    ? "form-control is-valid"
                    : "form-control is-invalid"
                }
                rows="3"
                onChange={(e) => set_file_description(e.target.value)}
              ></textarea>
            </div>
            <hr />
            <div className="mb-3">
              <div className="input-group">
                <input
                  type="file"
                  className="form-control"
                  onChange={(e) => fileHandler(e)}
                />
              </div>
              <div className="form-text">
                Eklenecek dosyayı cihazınızdan seçiniz.
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => set_show(false)}
            >
              Kapat
            </button>
            <button
              type="button"
              className="btn btn-primary"
              data-bs-dismiss="modal"
              onClick={insertData}
            >
              Kaydet
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FileModal;
