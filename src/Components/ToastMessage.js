import React from "react";
import "../Styles/ToastMessageStyle.css";

function ToastMessage({ title, message, closeToast }) {
  return (
    <div
      className="toast"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
    >
      <div className="toast-header">
        <strong className="me-auto">{title}</strong>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="toast"
          aria-label="Close"
          onClick={() => closeToast(false)}
        ></button>
      </div>
      <div className="toast-body">
        {message.map((val) => (
          <p>{val}</p>
        ))}
      </div>
    </div>
  );
}

export default ToastMessage;
