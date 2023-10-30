import React, { useEffect } from 'react';
import ReactModal from 'react-modal';
import ReactDOM from 'react-dom';
import '../../../src/styles.css';

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ isOpen, largeImageURL, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  return ReactDOM.createPortal(
    <div className="Overlay" >
      <ReactModal
        className="Modal"
        isOpen={isOpen}
        onRequestClose={onClose}
        contentLabel="Large Image"
        appElement={modalRoot}
      >
        <img src={largeImageURL} alt="Large" />
      </ReactModal>
    </div>,
    modalRoot);
  
};

export default Modal;


