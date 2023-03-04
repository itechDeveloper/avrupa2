import React from "react";

import Firebase from "../../Helpers/Firebase";
import { update, ref } from "firebase/database";
import cloudHelper from "../../Helpers/CloudHelper";

function File({ data, folder_name, file_title, file_description, file_name }) {
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
    let index = 0;
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

  return (
    <div className="card margin-top-10">
      <div className="card-header">{file_name}</div>
      <div className="card-body">
        <div className="file-operations">
          <button className="btn btn-outline-danger" onClick={deleteFile}>
            Bu Dosyayı Sil
          </button>
          <button className="btn btn-outline-success">
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
          <input type="file" className="form-control" aria-label="Upload" />
          <button className="btn btn-outline-secondary" type="button">
            Yükle
          </button>
        </div>
      </div>
    </div>
  );
}

export default File;
