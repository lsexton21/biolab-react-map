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
          <h3 className={styles.real}>Real</h3>
          <h3 className={styles["sub-real"]}>
            <div className={styles.research}>Research</div>
            <div className={styles.data}>Data</div>
          </h3>
        </div>
        <div className={styles["bioLab-and-nav-container"]}>
          <div className={styles["bioLab-container"]}>
            <h3 className={styles.the}>The</h3>
            <h3 className={styles.bioLab}>BioLab</h3>
            <h3 className={styles.hthi}>at HTHI</h3>
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
