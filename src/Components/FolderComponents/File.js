import React, { useState } from "react";

import Firebase from "../../Helpers/Firebase";
import { update, ref } from "firebase/database";
import cloudHelper from "../../Helpers/CloudHelper";
import FileModal from "./FileModal";
import LoadingScreen from "../LoadingScreen";

function File({ data, folder_name, file_title, file_description, file_name }) {
  // UPDATE FILE
  const [file, set_file] = useState();
  const [m_file_name, set_file_name] = useState();
  function fileHandler(event) {
    const file = event.target.files[0];
    if (file) {
      set_file(file);
      set_file_name(file.name);
    }
  }

  async function uploadFile() {
    let temp = data;
    for (let i = 0; i < data.length; i++) {
      if (folder_name == data[i].folder_name) {
        for (let j = 0; j < data[i].files.length; j++) {
          if (
            data[i].files[j].file_name == file_name &&
            data[i].files[j].file_description == file_description
          ) {
            set_show_loading_page(true);
            temp[i].files[j].file_name = m_file_name;
            await cloudHelper.deleteFile(folder_name, file_name);
            await cloudHelper.uploadFile(file, m_file_name, folder_name);

            // get database
            const database = Firebase().database;

            // update
            update(ref(database, "data/"), {
              folders: temp,
            })
              .then(() => window.location.reload())
              .catch((error) => console.log(error));

            set_show_loading_page(false);
            return;
          }
        }
      }
    }
  }

  // DELETE
  async function deleteFile() {
    const database = Firebase().database;
    let mData = await handleData();
    update(ref(database, "data/"), {
      folders: mData,
    })
      .then(() => window.location.reload())
      .catch((error) => console.log(error));
  }
  async function handleData() {
    let temp = [];
    let index = 1;
    for (let i = 0; i < data.length; i++) {
      if (data[i].folder_name == folder_name) {
        if (data[i].files.length == 1) {
          temp[i] = { folder_name: data[i].folder_name };
          await cloudHelper.deleteFile(folder_name, file_name);
        } else {
          for (let j = 0; j < data[i].files.length; j++) {
            if (data[i].files[j]) {
              if (data[i].files[j].file_name == file_name) {
                await cloudHelper.deleteFile(folder_name, file_name);
              } else {
                if (temp[i]) {
                  temp[i].files[index] = data[i].files[j];
                  index++;
                } else {
                  temp[i] = {
                    folder_name: folder_name,
                    files: [data[i].files[j]],
                  };
                }
              }
            }
          }
        }
      } else {
        temp[i] = data[i];
      }
    }
    return temp;
  }

  // modals
  const [show_file_modal, set_show_file_modal] = useState(false);
  const [show_loading_page, set_show_loading_page] = useState(false);

  return (
    <div className="card margin-top-10">
      {show_loading_page && (
        <LoadingScreen
          message={"Cloud dosyalarınız güncelleniyor. Lütfen bekleyiniz."}
        />
      )}
      {show_file_modal && (
        <FileModal
          data={data}
          set_show={set_show_file_modal}
          folder_name={folder_name}
          insert={false}
          passData={{
            file_title: file_title,
            file_description: file_description,
          }}
        />
      )}
      <div className="card-header">{file_name}</div>
      <div className="card-body">
        <div className="file-operations">
          <button className="btn btn-outline-danger" onClick={deleteFile}>
            Bu Dosyayı Sil
          </button>
          <button
            className="btn btn-outline-success"
            onClick={() => set_show_file_modal(true)}
          >
            Bu Dosyayı Düzenle
          </button>
        </div>

        <h5 className="card-title">{file_title}</h5>
        <p className="card-text">{file_description}</p>
        <a
          href="#"
          className="btn btn-outline-primary"
          onClick={() => cloudHelper.dowloadFile(folder_name, file_name)}
        >
          Dosyayı İndir
        </a>

        <div className="input-group">
          <input
            type="file"
            className="form-control"
            aria-label="Upload"
            onChange={(e) => fileHandler(e)}
          />
          <button
            className="btn btn-outline-secondary"
            type="button"
            onClick={() => uploadFile()}
          >
            Yükle
          </button>
        </div>
      </div>
    </div>
  );
}

export default File;
