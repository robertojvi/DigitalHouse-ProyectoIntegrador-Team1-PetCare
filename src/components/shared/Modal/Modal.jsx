import React from "react";
import "../../../styles/modal/modal.css"

const Modal = ({ onClose, children }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button 
          onClick={onClose} 
          className="modal-close"
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
