import { Fragment, useState, useContext } from "react";
import { Outlet, useParams, NavLink } from "react-router-dom";

import styles from "./UserHomepage.module.css";

import { useHttpClient } from "../../shared/hooks/http-hook";
import LoadingSpinner from "../../shared/UI/LoadingSpinner";
import ErrorModal from "../../shared/errors/ErrorModal";

import { faGear } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";

import AuthContext from "../../shared/context/auth-context";

const UserHomepage = (props) => {
  const { sendRequest, error, clearError, isLoading } = useHttpClient();
  const paramUserId = useParams().userId;
  const authCtx = useContext(AuthContext);

  library.add(faGear);

  const filteredUserData = props.usersData.filter(
    (user) => user._id === paramUserId
  );

  const filteredSpeciesData = props.speciesData.filter(
    (species) => species.creators[0] === paramUserId
  );

  return (
    <Fragment>
      <ErrorModal error={!!error} onClick={clearError} />
      {!isLoading && filteredUserData[0] && filteredSpeciesData ? (
        <div className={styles.homepageContainer}>
          <div className={styles.spacer}></div>
          <ul className={styles.homepageLinks}>
            <NavLink
              to={`/users/${filteredUserData[0]._id}/myspecies`}
              style={({ isActive }) =>
                isActive
                  ? {
                      color: "black",
                      borderBottom: "0.4rem solid #9ae07f",
                      backgroundColor: "white",
                      boxShadow: "none",
                    }
                  : undefined
              }
            >
              My Species
            </NavLink>
            <NavLink
              to={`newspecies`}
              style={({ isActive }) =>
                isActive
                  ? {
                      color: "black",
                      borderBottom: "0.4rem solid #9ae07f",
                      backgroundColor: "white",
                      boxShadow: "none",
                    }
                  : undefined
              }
            >
              + Add Species
            </NavLink>
            <NavLink
              to={`settings`}
              style={({ isActive }) =>
                isActive
                  ? {
                      color: "black",
                      borderBottom: "0.4rem solid #9ae07f",
                      backgroundColor: "white",
                      boxShadow: "none",
                    }
                  : undefined
              }
            >
              <FontAwesomeIcon
                style={{ marginRight: "1rem" }}
                icon="fa-solid fa-gear"
              />
              Settings
            </NavLink>
          </ul>
          <Outlet />
        </div>
      ) : (
        <LoadingSpinner />
      )}
    </Fragment>
  );
};

export default UserHomepage;
