import React, { useState } from "react";
import FolderModal from "./FolderModal";
import FileModal from "./FileModal";
import File from "./File";

import Firebase from "../../Helpers/Firebase";
import { update, ref } from "firebase/database";
import LoadingScreen from "../LoadingScreen";
import cloudHelper from "../../Helpers/CloudHelper";

function Folder({ data, folder_name }) {
  const [show, set_show] = useState(false);

  // update is actually deleting here (remove data to delete & save final array)
  async function deleteFolder() {
    set_show_loading_page(true);

    for (let i = 0; i < data.length; i++) {
      if (folder_name == data[i].folder_name) {
        if (data[i].files) {
          for (let j = 0; j < data[i].files.length; j++) {
            await cloudHelper.deleteFile(
              folder_name,
              data[i].files[j].file_name
            );
          }
        }
      }
    }

    const database = Firebase().database;

    let mData = getDataRest();
    update(ref(database, "data/"), {
      folders: mData,
    })
      .then(() => window.location.reload())
      .catch((error) => console.log(error));

    set_show_loading_page(false);
  }

  function getDataRest() {
    let temp = [];
    let index = 0;
    for (let i = 0; i < data.length; i++) {
      if (data[i].folder_name == folder_name) {
        continue;
      } else {
        temp[index] = data[i];
        index++;
      }
    }

    return temp;
  }

  function getFiles() {
    for (let i = 0; i < data.length; i++) {
      if (data[i].folder_name == folder_name) {
        return data[i].files;
      }
    }
  }

  // modals
  const [show_folder_modal, set_show_folder_modal] = useState(false);
  const [show_file_modal, set_show_file_modal] = useState(false);
  const [show_loading_page, set_show_loading_page] = useState(false);

  return (
    <div className="accordion">
      {show_loading_page && (
        <LoadingScreen
          message={
            "Klasör içindeki dosyalar cloud'dan siliniyor. Lütfen bekleyiniz."
          }
        />
      )}
      {show_folder_modal && (
        <FolderModal
          data={data}
          show_modal={set_show_folder_modal}
          folder_data={{
            title: "Dosya Adını Güncelle",
            folder_name: folder_name,
          }}
          insert={false}
        />
      )}
      {show_file_modal && (
        <FileModal
          data={data}
          set_show={set_show_file_modal}
          folder_name={folder_name}
        />
      )}
      <div className="accordion-item">
        <h2 className="accordion-header" onClick={() => set_show(!show)}>
          <button className="accordion-button" type="button">
            {folder_name}
          </button>
        </h2>
        <div
          className={
            show
              ? "accordion-collapse collapse show"
              : "accordion-collapse collapse"
          }
        >
          <div className="accordion-body">
            <div className="card">
              <div className="card-body">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => set_show_file_modal(true)}
                >
                  Dosya Ekle
                </button>
                <span className="folder-operations">
                  <button
                    type="button"
                    className="btn btn-outline-danger"
                    onClick={deleteFolder}
                  >
                    Bu Klasörü Sil
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-success"
                    onClick={() => set_show_folder_modal(true)}
                  >
                    Klasörün Adını Değiştir
                  </button>
                </span>
              </div>
            </div>
            {getFiles() &&
              getFiles().map((value) => (
                <File
                  data={data}
                  folder_name={folder_name}
                  file_title={value.file_title}
                  file_description={value.file_description}
                  file_name={value.file_name}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Folder;
