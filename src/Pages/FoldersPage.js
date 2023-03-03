import React, { useEffect, useState } from "react";
import "../Styles/FoldersStyle.css";
import FolderModal from "../Components/FolderComponents/FolderModal";
import LoadingScreen from "../Components/LoadingScreen";
import Navbar from "../Components/Navbar";
import Folder from "../Components/FolderComponents/Folder";

import Firebase from "../Helpers/Firebase";
import { child, get, ref } from "firebase/database";

function FoldersPage() {
  const [data, set_data] = useState();

  function fetchData() {
    const database = Firebase().database;
    get(child(ref(database), "/")).then((snapshot) => {
      if (snapshot.exists()) {
        if (snapshot.val()) {
          set_data(clearData(snapshot.val().data.folders));
        }
      } else {
        set_data([]);
      }
    });
  }

  function clearData(data) {
    let temp = [];
    let index = 0;
    for (let i = 0; i < data.length; i++) {
      if (data[i]) {
        temp[index] = data[i];
        index++;
      }
    }
    return temp;
  }

  // RUN HERE
  useEffect(() => {
    fetchData();
  }, []);

  // modal
  const [show_modal, set_show_modal] = useState(false);

  return (
    <div className="folder-container container">
      {data ? (
        <div>
          <Navbar />
          {show_modal && (
            <FolderModal
              data={data}
              show_modal={set_show_modal}
              folder_data={{ title: "Dosya Oluştur", folder_name: "" }}
              insert={true}
            />
          )}
          <button
            type="button"
            className="btn btn-outline-secondary folder-modal-btn"
            onClick={() => set_show_modal(true)}
          >
            Klasör Oluştur
          </button>

          {data.map((value) => (
            <Folder data={data} folder_name={value.folder_name} />
          ))}
        </div>
      ) : (
        <LoadingScreen />
      )}
    </div>
  );
}

export default FoldersPage;
