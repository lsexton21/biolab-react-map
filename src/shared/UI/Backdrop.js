import ReactDOM from "react-dom";

import styles from "./Backdrop.module.css";
import FadeInOut from "./CSSTransitions/FadeInOut.module.css";
import { CSSTransition } from "react-transition-group";

const Backdrop = (props) => {
  return ReactDOM.createPortal(
    <CSSTransition
      in={props.show}
      timeout={200}
      classNames={FadeInOut}
      mountOnEnter
      unmountOnExit
    >
      <div
        className={`${styles.backdrop} ${styles[props.background]}`}
        onClick={props.onClick}
      >
        {props.children}
      </div>
    </CSSTransition>,
    document.getElementById("backdropOverlay")
  );
};

export default Backdrop;
