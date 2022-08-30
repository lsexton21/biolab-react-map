import { Fragment } from "react";
import styles from "./Layout.module.css";

import NavBar from "./NavControls/NavBar";

const Layout = (props) => {
  return (
    <Fragment>
      <NavBar usersData={props.usersData} />
      <main className={styles.main}>{props.children}</main>
    </Fragment>
  );
};

export default Layout;
