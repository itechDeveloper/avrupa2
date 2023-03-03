import React, { useState } from "react";

import Firebase from "../../Helpers/Firebase";
import { update, set, ref } from "firebase/database";

function FolderModal({
  data,
  show_modal,
  folder_data = { title: "", folder_name: "" },
  insert = true,
}) {
  const [folder_name, set_folder_name] = useState(folder_data.folder_name);

  function insertData() {
    // handle new data
    let mData = data;
    if (!mData) mData = [];
    mData[mData.length + 1] = { folder_name: folder_name };

    // get database
    const database = Firebase().database;

    // update
    if (mData.length > 0) {
      update(ref(database, "data/"), {
        folders: mData,
      })
        .then(() => window.location.reload())
        .catch((error) => console.log(error));
    }
    // create
    else {
      set(ref(database, "data/"), {
        folders: mData,
      })
        .then(() => window.location.reload())
        .catch((error) => console.log(error));
    }
  }

  function updateData() {
    // update folder name in data
    let mData = data;
    for (let i = 0; i < mData.length; i++) {
      if (folder_data.folder_name == mData[i].folder_name) {
        mData[i].folder_name = folder_name;
      }
    }

    // get database
    const database = Firebase().database;

    // update
    update(ref(database, "data/"), {
      folders: mData,
    })
      .then(() => window.location.reload())
      .catch((error) => console.log(error));
  }

  return (
    <div className="modal show">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5">{folder_data.title}</h1>
            <button
              type="button"
              className="btn-close"
              onClick={() => show_modal(false)}
            ></button>
          </div>
          <div className="modal-body">
            <input
              type="text"
              placeholder="Bu alana dosya adını giriniz"
              className="form-control"
              value={folder_name}
              onChange={(e) => set_folder_name(e.target.value)}
            />
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => show_modal(false)}
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

export default FolderModal;
