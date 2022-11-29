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
              src={`${process.env.REACT_APP_AWS_URL}/${props.userData.profileImg}`}
              alt="Lucas Sexton"
            ></img>
          </div>
          <div className={styles["info-container"]}>
            <h3>
              {props.userData.firstName} {props.userData.lastName}
            </h3>
            <div className={styles.spacer}></div>
            <h4>Species Documented: {props.userData.species.length}</h4>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default UserProfile;
