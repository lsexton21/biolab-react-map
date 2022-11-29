import { Fragment } from "react";
import Button from "../form-elements/Button";
import ReactDOM from "react-dom";

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
      <div className={styles.backdrop} onClick={props.onClick}>
        {props.children}
      </div>
    </CSSTransition>,
    document.getElementById("errorBackdrop")
  );
};

const ErrorModalOverlay = (props) => {
  return ReactDOM.createPortal(
    <div className={`modal ${styles.modal}`} style={props.style}>
      <header className={`modal__header ${props.headerClass}`}>
        <h2>An Error Occured!</h2>
      </header>
      <form
        onSubmit={
          props.onClick ? props.onClick : (event) => event.preventDefault()
        }
      >
        <h4 className={`modal__content ${props.contentClass}`}>
          {props.error}
        </h4>
        <footer className={`modal__footer ${props.footerClass}`}>
          <Button>Okay</Button>
        </footer>
      </form>
    </div>,
    document.getElementById("errorModalOverlay")
  );
};

const ErrorModal = (props) => {
  return (
    <Fragment>
      {!!props.error && (
        <ErrorBackdrop show={!!props.error}>
          <ErrorModalOverlay error={props.error} onClick={props.onClick} />
        </ErrorBackdrop>
      )}
    </Fragment>
  );
};

export default ErrorModal;
