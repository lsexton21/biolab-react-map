import { Fragment } from "react";
import ReactDOM from "react-dom";
import styles from "./ModalOnModal.module.css";

const ModalOverlay = (props) => {
  const content = (
    <div className={styles.modalContainer}>
      <div className={styles.modal} style={props.style}>
        <header className={styles.header}>
          <div>{props.header}</div>
          <button className={styles.button} onClick={props.onCancel}>
            Cancel
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
          {props.children}
        </ModalOverlay>
      )}
    </Fragment>
  );
};

export default ModalOnModal;
