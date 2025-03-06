import React from "react";
import Modal from "react-modal";
import './MyModal.css';

Modal.setAppElement("#root");

const MyModal = ({ isOpen, onClose, title, description, children }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel={title}
      className="modal-content"
      overlayClassName="modal-overlay"
    >
      <button onClick={onClose} className="modal-close">&times;</button>
      <div className="modal-header">
        <h2>{title}</h2>
      </div>
      <p className="modal-description"  dangerouslySetInnerHTML={{ __html: description }}></p>
      <div className="modal-body">{children}</div>
    </Modal>
  );
};

export default MyModal;
