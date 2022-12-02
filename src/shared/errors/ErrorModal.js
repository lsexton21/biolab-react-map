import { Fragment } from "react";
import Button from "../form-elements/Button";
import ReactDOM from "react-dom";
import Backdrop from "../UI/Backdrop";

import styles from "./ErrorModal.module.css";
import FadeInOut from "../UI/CSSTransitions/FadeInOut.module.css";
import { CSSTransition } from "react-transition-group";

const ErrorBackdrop = (props) => {
  return ReactDOM.createPortal(
    <CSSTransition
      in={props.show}
      timeout={200}
      classNames={FadeInOut}
      mountOnEnter
      unmountOnExit
    >
      <div className={styles.errorBackdrop} onClick={props.onClick}>
        {props.children}
      </div>
    </CSSTransition>,
    document.getElementById("errorBackdrop")
  );
};

const ErrorModalOverlay = (props) => {
  return ReactDOM.createPortal(
    <div className={styles.errorModal} style={props.style}>
      <header className={styles.errorModal__header}>
        <h2>An Error Occured!</h2>
        <button className={styles.errorModal__button} onClick={props.onClick}>
          X
        </button>
      </header>
      <form
        onSubmit={
          props.onClick ? props.onClick : (event) => event.preventDefault()
        }
      >
        <h3 className={styles.errorModal__content}>{props.error}</h3>
      </form>
    </div>,
    document.getElementById("errorModalOverlay")
  );
};

const ErrorModal = (props) => {
  return (
    <Fragment>
      {props.error && (
        <ErrorBackdrop
          background="black"
          show={props.error}
          onClick={props.onClick}
        />
      )}
      <CSSTransition
        in={props.error}
        mountOnEnter
        unmountOnExit
        timeout={200}
        classNames="modal"
      >
        <ErrorModalOverlay error={props.error} onClick={props.onClick} />
      </CSSTransition>
    </Fragment>
  );
};

export default ErrorModal;
