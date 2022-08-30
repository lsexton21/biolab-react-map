import { useContext, Fragment, useState } from "react";
import styles from "./NavBar.module.css";

import AuthContext from "../../context/auth-context";
import NavButton from "./NavButton";
import UserProfile from "../../../users/components/UserProfile";
import Welcome from "./Welcome";
import { useEffect } from "react";

const NavBar = (props) => {
  const [showAuth, setShowAuth] = useState(false);
  const [startUpGuest, setStartUpGuest] = useState(true);
  const [startUpUserProfile, setStartUpUserProfile] = useState(true);
  const authCtx = useContext(AuthContext);

  const filteredUserData = props.usersData.filter(
    (user) => user._id === authCtx.userId
  );

  const showAuthHandler = () => {
    setShowAuth(!showAuth);
  };

  const startUpGuestHandler = () => {
    setStartUpGuest(false);
  };

  useEffect(() => {
    setTimeout(() => {
      setStartUpUserProfile(!startUpUserProfile);
    }, 1000);
  }, []);

  return (
    <Fragment>
      {authCtx.isLoggedIn && filteredUserData ? (
        <header
          className={`${styles.navBarHeader} ${
            startUpUserProfile ? styles.closeBackground : styles.fixedBackground
          }`}
        >
          <Fragment>
            <UserProfile userData={filteredUserData[0]} /> <NavButton />
          </Fragment>
        </header>
      ) : (
        <header
          className={`${styles.navBarHeader} ${
            showAuth ? styles.openBackgroundImmediately : styles.fixedBackground
          }`}
        >
          <Welcome
            showAuth={showAuth}
            onShowAuth={showAuthHandler}
            startUp={startUpGuest}
            onStartUp={startUpGuestHandler}
          />
        </header>
      )}
    </Fragment>
  );
};

export default NavBar;
