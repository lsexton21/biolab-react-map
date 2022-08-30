import { Fragment, useState } from "react";
import ReactDOM from "react-dom";
import Backdrop from "./Backdrop";
import styles from "./Modal.module.css";

const ModalOverlay = (props) => {
  const [showHeader, setShowHeader] = useState(true);

  return ReactDOM.createPortal(
    <div className={styles.modal} style={props.style}>
      {!props.hideHeader && (
        <header className={styles.header}>
          <div>{props.header}</div>
          <button className={styles.button} onClick={props.onCancel}>
            Cancel
          </button>
        </header>
      )}
      <div className={styles.body}>{props.children}</div>
    </div>,
    document.getElementById("modalOverlay")
  );
};

const Modal = (props) => {
  return (
    <Fragment>
      {props.show && (
        <Fragment>
          <Backdrop onClick={props.onCancel} background={props.background} />
          <ModalOverlay
            header={props.header}
            style={props.style}
            onCancel={props.onCancel}
          >
            {props.children}
          </ModalOverlay>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Modal;
