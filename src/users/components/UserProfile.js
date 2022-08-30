import { Fragment } from "react";

import styles from "./UserProfile.module.css";

const UserProfile = (props) => {
  return (
    <Fragment>
      {props.userData && (
        <div className={styles["profile-container"]}>
          <div className={styles["profileImg-container"]}>
            <img
              className={styles.profileImg}
              src={`${process.env.REACT_APP_BACKEND_URL}/${props.userData.profileImg}`}
              alt="Lucas Sexton"
            ></img>
          </div>
          <div className={styles["info-container"]}>
            <h2>
              {props.userData.firstName} {props.userData.lastName}
            </h2>
            <div className={styles.spacer}></div>
            <h3>Species Documented: {props.userData.species.length}</h3>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default UserProfile;
