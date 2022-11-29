import { useState } from "react";
import styles from "./WelcomeDirections.module.css";

const WelcomeDirections = (props) => {
  return (
    <div
      className={`${styles.welcomeContainer} ${
        props.show ? "" : styles.hideWelcomeContainer
      }`}
    >
      <div className={styles.welcomeTextContainer}>
        <div className={styles.welcomeTitle}>Welcome Guests!</div>
        <div className={styles.speciesNamesDivider} />
        <div className={styles.welcomeText}>
          Please click any of the markers on the map to find out more!
        </div>
        <div onClick={props.onShow} className={styles.okay}>
          Okay
        </div>
      </div>
    </div>
  );
};

export default WelcomeDirections;
