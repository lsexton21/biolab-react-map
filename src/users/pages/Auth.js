import { useState, Fragment } from "react";
import { Outlet, Link } from "react-router-dom";

import styles from "./Auth.module.css";

import ErrorModal from "../../shared/errors/ErrorModal";
import { useHttpClient } from "../../shared/hooks/http-hook";

import Register from "../components/Register";
import Login from "../components/Login";

const Auth = (props) => {
  const [showRegister, setShowRegister] = useState(false);

  const showRegisterHandler = () => {
    setShowRegister(!showRegister);
  };
  return (
    <div
      className={`${styles.authContainer} ${
        props.showAuth ? styles["auth-moveIn"] : styles["auth-moveOut"]
      }`}
    >
      {showRegister ? (
        <Register onShowAuth={props.onShowAuth} />
      ) : (
        <Login
          onShowAuth={props.onShowAuth}
          onShowRegister={showRegisterHandler}
        />
      )}
    </div>
  );
};

export default Auth;
