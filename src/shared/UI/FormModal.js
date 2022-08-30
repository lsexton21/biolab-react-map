import React from "react";
import ReactDOM from "react-dom";

import Backdrop from "./Backdrop";
import "./FormModal.css";

const ModalOverlay = (props) => {
  const content = (
    <div className={`modal ${props.className}`} style={props.style}>
      <header className={`modal__header ${props.headerClass}`}>
        <h2>{props.header}</h2>
      </header>
      <form
        onSubmit={
          props.onSubmit ? props.onSubmit : (event) => event.preventDefault()
        }
      >
        <div className={`modal__content ${props.contentClass}`}>
          {props.children}
        </div>
        <footer className={`modal__footer ${props.footerClass}`}>
          {props.footer}
        </footer>
      </form>
    </div>
  );
  return ReactDOM.createPortal(
    content,
    document.getElementById("modalOverlay")
  );
};

const FormModal = (props) => {
  return (
    <React.Fragment>
      {props.show && (
        <Backdrop background={props.background} onClick={props.onCancel} />
      )}
      <ModalOverlay {...props}>{props.children}</ModalOverlay>
    </React.Fragment>
  );
};

export default FormModal;
