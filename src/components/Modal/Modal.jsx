import React, { Component } from 'react';
import ReactModal from 'react-modal';
import ReactDOM from 'react-dom';
import '../../../src/styles.css';

const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {
  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      this.props.onClose();
    }
  };

  handleModalClick = (event) => {
    if (event.target === event.currentTarget) {
      this.props.onClose();
    }
  };

  render() {
    const { isOpen, largeImageURL } = this.props;
    
    return ReactDOM.createPortal(
      <div className="Overlay">
        <ReactModal
          className="Modal"
          isOpen={isOpen}
          onRequestClose={this.props.onClose}
          contentLabel="Large Image"
          onClick={this.handleModalClick}
        >
          <img src={largeImageURL} alt="Large" />
        </ReactModal>
      </div>,
      modalRoot);
  };
};

export default Modal;

