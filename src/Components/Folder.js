import React, { useState } from "react";

function Folder({ folder_name }) {
  const [show, set_show] = useState(false);
  return (
    <div className="accordion">
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
              <div className="card-header">Dosya Adı</div>
              <div className="card-body">
                <h5 className="card-title">Açıklama Başlığı</h5>
                <p className="card-text">
                  Dosyanın ayrıntılarına ilişkin açıklama
                </p>
                <a href="#" className="btn btn-primary">
                  Dosyayı İndir
                </a>
                <div className="input-group">
                  <input
                    type="file"
                    className="form-control"
                    aria-label="Upload"
                  />
                  <button className="btn btn-outline-secondary" type="button">
                    Yükle
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Folder;
