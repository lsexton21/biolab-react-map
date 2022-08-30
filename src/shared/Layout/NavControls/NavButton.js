import { useState } from "react";
import Backdrop from "../../UI/Backdrop";
import styles from "./NavButton.module.css";
import NavLinks from "./NavLinks";

const NavMenu = (props) => {
  const [toggleNavMenu, setToggleNavMenu] = useState(false);
  const toggleNavHandler = () => {
    setToggleNavMenu(!toggleNavMenu);
  };

  return (
    <div className={styles["main-header"]}>
      {!toggleNavMenu && (
        <button
          onClick={toggleNavHandler}
          className={styles["main-navigation__menu-btn"]}
        >
          <span />
          <span />
          <span />
        </button>
      )}
      <Backdrop
        background="solidWhite"
        show={toggleNavMenu}
        onClick={toggleNavHandler}
      >
        <NavLinks onClick={toggleNavHandler} />
      </Backdrop>
    </div>
  );
};

export default NavMenu;
