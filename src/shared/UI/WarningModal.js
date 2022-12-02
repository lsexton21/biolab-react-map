import React from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";

import Backdrop from "./Backdrop";
import "./WarningModal.css";

const ModalOverlay = (props) => {
  const content = (
    <div className={"modalContainer"}>
      <div className={`modal ${props.className}`} style={props.style}>
        <header className={`modal__header ${props.headerClass}`}>
          <h2>{props.header}</h2>
          <button className={"modal__button"} onClick={props.onCancel}>
            X
          </button>
        </header>
        <form
          onSubmit={
            props.onSubmit ? props.onSubmit : (event) => event.preventDefault()
          }
        >
          <div className={`modal__content ${props.contentClass}`}>
            {props.children}
          </div>
        </form>
      </div>
    </div>
  );
  return ReactDOM.createPortal(
    content,
    document.getElementById("modalOverlay")
  );
};

const WarningModal = (props) => {
  return (
    <React.Fragment>
      {props.show && (
        <Backdrop
          background="black"
          show={props.show}
          onClick={props.onCancel}
        />
      )}
      <CSSTransition
        in={props.show}
        mountOnEnter
        unmountOnExit
        timeout={200}
        classNames="modal"
      >
        <ModalOverlay {...props} />
      </CSSTransition>
    </React.Fragment>
  );
};

export default WarningModal;
