import React from "react";
import ReactDOM from "react-dom";

import styles from "./SideDrawer.module.css";

const SideDrawer = (props) => {
  const content = (
    <aside className={styles["side-drawer"]} onClick={props.onClick}>
      {props.children}
    </aside>
  );

  return ReactDOM.createPortal(content, document.getElementById("sideDrawer"));
};

export default SideDrawer;
