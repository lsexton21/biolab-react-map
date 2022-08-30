import { useContext, Fragment } from "react";
import { NavLink, useNavigate, Link } from "react-router-dom";
import styles from "./NavLinks.module.css";
import AuthContext from "../../context/auth-context";

import { faGear } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";

const NavLinks = (props) => {
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);

  library.add(faGear);

  const logoutHandler = () => {
    authCtx.logout();
    navigate("/");
    window.location.reload(false);
  };

  return (
    <ul className={styles["nav-links"]}>
      {authCtx.isLoggedIn ? (
        <Fragment>
          <li>
            <NavLink
              onClick={props.onClick}
              className={(navData) => (navData.isActive ? styles.active : "")}
              to={""}
            >
              Class Map
            </NavLink>
          </li>
          <li>
            <NavLink
              onClick={props.onClick}
              className={(navData) => (navData.isActive ? styles.active : "")}
              to={`/users/${authCtx.userId}/myspecies`}
            >
              My Profile
            </NavLink>
          </li>
          <li>
            <button className={styles["nav-links a"]} onClick={logoutHandler}>
              Log Out
            </button>
          </li>
        </Fragment>
      ) : (
        <Fragment>
          <li>
            <NavLink
              onClick={props.onClick}
              className={(navData) => (navData.isActive ? styles.active : "")}
              to="/users"
            >
              Users
            </NavLink>
          </li>
          <li>
            <NavLink
              onClick={props.onClick}
              className={(navData) => (navData.isActive ? styles.active : "")}
              to="/species"
            >
              Species
            </NavLink>
          </li>
          <li>
            <NavLink
              onClick={props.onClick}
              className={(navData) => (navData.isActive ? styles.active : "")}
              to="/auth"
            >
              Sign In
            </NavLink>
          </li>
        </Fragment>
      )}
    </ul>
  );
};

export default NavLinks;
