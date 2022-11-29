import { Fragment } from "react";
import ReactDOM from "react-dom";
import styles from "./ModalOnModal.module.css";
import { CSSTransition } from "react-transition-group";

const ModalOverlay = (props) => {
  const content = (
    <div className={styles.modalContainer} style={props.style}>
      <div className={styles.modal}>
        <header className={styles.header}>
          <div>{props.header}</div>
          <button className={styles.button} onClick={props.onCancel}>
            X
          </button>
        </header>
        <div className={styles.body}>{props.children}</div>
      </div>
    </div>
  );
  return ReactDOM.createPortal(
    content,
    document.getElementById("modalOnModal")
  );
};
const ModalOnModal = (props) => {
  return (
    <Fragment>
      {props.show && (
        <ModalOverlay
          header={props.header}
          style={props.style}
          onCancel={props.onCancel}
        >
          <CSSTransition
            in={props.show}
            mountOnEnter
            unmountOnExit
            timeout={200}
            classNames="modal"
          >
            {props.children}
          </CSSTransition>
        </ModalOverlay>
      )}
    </Fragment>
  );
};

export default ModalOnModal;
