import { Fragment, useContext } from "react";
import AuthContext from "../../context/auth-context";

import styles from "./Welcome.module.css";
import Auth from "../../../users/pages/Auth";

const Welcome = (props) => {
  const authCtx = useContext(AuthContext);

  return (
    <Fragment>
      <header className={styles["welcome-control"]}>
        <div className={styles["real-container"]}>
          <h1 className={styles.real}>Real</h1>
          <div className={styles["sub-real"]}>
            <h1 className={styles.research}>Research</h1>
            <h1 className={styles.data}>Data</h1>
          </div>
        </div>
        <div className={styles["bioLab-and-nav-container"]}>
          <div className={styles["bioLab-container"]}>
            <h2 className={styles.the}>The</h2>
            <h1 className={styles.bioLab}>BioLab</h1>
            <h2 className={styles.hthi}>at HTHI</h2>
          </div>
        </div>
        <div className={styles["guestMode-container"]}>
          <button className={styles.login} onClick={props.onShowAuth}>
            Student Login
          </button>
        </div>
      </header>
      {props.showAuth && (
        <div className={styles["auth-container"]}>
          <Auth onShowAuth={props.onShowAuth} showAuth={props.showAuth} />
        </div>
      )}
    </Fragment>
  );
};

export default Welcome;
