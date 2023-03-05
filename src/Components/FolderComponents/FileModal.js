import React, { useState } from "react";

import Firebase from "../../Helpers/Firebase";
import { ref, update } from "firebase/database";
import CloudHelper from "../../Helpers/CloudHelper";
import LoadingScreen from "../LoadingScreen";

function FileModal({ data, set_show, folder_name, passData, insert = true }) {
  const [file, set_file] = useState();
  const [file_title, set_file_title] = useState(
    passData && passData.file_title
  );
  const [file_description, set_file_description] = useState(
    passData && passData.file_description
  );
  const [file_name, set_file_name] = useState();

  const [show_loading_page, set_show_loading_page] = useState(false);

  function fileHandler(event) {
    const file = event.target.files[0];
    if (file) {
      set_file(file);
      set_file_name(file.name);
    }
  }

  /* INSERT */
  async function insertData() {
    if (!file || !file_title || !file_description || !file_name) {
      // todo: show alert
      return;
    }

    set_show_loading_page(true);

    // get database
    const database = Firebase().database;

    // upload to cloud
    await CloudHelper.uploadFile(file, file_name, folder_name);

    // get data
    let mData = handleInsertData();

    // add
    update(ref(database, "data/"), {
      folders: mData,
    })
      .then(() => window.location.reload())
      .catch((error) => console.log(error));

    set_show_loading_page(false);
  }

  function handleInsertData() {
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

  /* UPDATE */
  async function updateData() {
    if (!file_title || !file_description) {
      // todo: show alert
      return;
    }

    set_show_loading_page(true);

    // get database
    const database = Firebase().database;

    // get data
    let mData = handleUpdateData();

    // add
    update(ref(database, "data/"), {
      folders: mData,
    })
      .then(() => window.location.reload())
      .catch((error) => console.log(error));

    set_show_loading_page(false);
  }

  function handleUpdateData() {
    let temp = data;
    for (let i = 0; i < temp.length; i++) {
      if (temp[i].folder_name == folder_name) {
        for (let j = 0; j < temp[i].files.length; j++) {
          if (
            passData.file_title == temp[i].files[j].file_title &&
            passData.file_description == temp[i].files[j].file_description
          ) {
            temp[i].files[j].file_title = file_title;
            temp[i].files[j].file_description = file_description;
            return temp;
          }
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
                value={file_title && file_title}
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
                value={file_description && file_description}
                rows="3"
                onChange={(e) => set_file_description(e.target.value)}
              ></textarea>
            </div>
            {insert && (
              <div className="mb-3">
                <hr />
                <div className="input-group">
                  <input
                    type="file"
                    className={
                      file ? "form-control is-valid" : "form-control is-invalid"
                    }
                    onChange={(e) => fileHandler(e)}
                  />
                </div>
                <div className="form-text">
                  Eklenecek dosyayı cihazınızdan seçiniz.
                </div>
              </div>
            )}
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
              onClick={insert ? insertData : updateData}
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
