import React, { useEffect, useState } from "react";
import FolderModal from "../Components/FolderModal";
import Navbar from "../Components/Navbar";
import "../Styles/FoldersStyle.css";

import database from "../Helpers/Firebase.js";
import { ref, get, child } from "firebase/database";
import Folder from "../Components/Folder";

function FoldersPage() {
  const [data, set_data] = useState();
  function getData() {
    get(child(ref(database()), "folders/")).then((snapshot) => {
      if (snapshot.exists()) {
        handleClearData(snapshot.val());
      }
    });
  }
  useEffect(() => {
    getData();
  }, []);

  function handleClearData(response) {
    let index = 0;
    let temp = [];
    for (let i = 0; i < response.data.length; i++) {
      if (response.data[i]) {
        temp[index] = response.data[i];
        index++;
      }
    }

    set_data(temp);
  }

  console.log(data);

  return (
    <div className="folder-container container">
      <Navbar />
      <FolderModal data={data ? data : []} set_data={set_data} />
      <button
        type="button"
        className="btn btn-primary btn-lg folder-modal-btn"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Dosya Oluştur
      </button>
      {data.map((value) => (
        <Folder folder_name={value.folder_name} />
      ))}
    </div>
  );
}

export default FoldersPage;
