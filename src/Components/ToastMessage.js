import React from "react";
import "../Styles/ToastMessageStyle.css";

function ToastMessage({ title, message, closeToast }) {
  return (
    <div class="toast" role="alert" aria-live="assertive" aria-atomic="true">
      <div class="toast-header">
        <strong class="me-auto">{title}</strong>
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="toast"
          aria-label="Close"
          onClick={() => closeToast(false)}
        ></button>
      </div>
      <div class="toast-body">
        {message.map((val) => (
          <p>{val}</p>
        ))}
      </div>
    </div>
  );
}

export default ToastMessage;
