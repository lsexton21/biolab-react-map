import { Fragment, useState, useContext } from "react";

import styles from "./UserSettings.module.css";

import { useHttpClient } from "../../shared/hooks/http-hook";
import { useNavigate } from "react-router-dom";
import WarningModal from "../../shared/UI/WarningModal";
import AuthContext from "../../shared/context/auth-context";
import Button from "../../shared/form-elements/Button";
import EditUser from "./EditUser";

const UserSettings = (props) => {
  const [deleteModal, setDeleteModal] = useState(false);
  const [toggleEditUser, setToggleEditUser] = useState(false);
  const { sendRequest, error, clearError, isLoading } = useHttpClient();
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  const toggleDeleteModalHandler = () => {
    setDeleteModal(!deleteModal);
  };

  const toggleEditUserHandler = () => {
    setToggleEditUser(!toggleEditUser);
  };

  const deleteUserHandler = async (event) => {
    event.preventDefault();
    setDeleteModal(!deleteModal);
    console.log(authCtx.userId);
    console.log(authCtx.token);
    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/${authCtx.userId}`,
        "DELETE",
        { Authorization: "Bearer " + authCtx.token }
      );
      authCtx.logout();
      navigate(`/`);
      window.location.reload(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Fragment>
      {deleteModal && (
        <WarningModal
          show={deleteModal}
          onSubmit={deleteUserHandler}
          onCancel={toggleDeleteModalHandler}
          onClick={toggleDeleteModalHandler}
          header="DELETE YOUR PROFILE?"
        >
          <div>
            <h3>
              Are you sure you want to delete your profile? Warning! You can not
              undo this action.
            </h3>
            <footer
              style={{
                marginTop: "2rem",
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Button danger onClick={deleteUserHandler}>
                DELETE
              </Button>
            </footer>
          </div>
        </WarningModal>
      )}
      {toggleEditUser ? (
        <EditUser />
      ) : (
        <ul className={styles.list}>
          <a onClick={toggleEditUserHandler}>Change Profile Settings</a>
          <a onClick={toggleDeleteModalHandler}>Delete Profile</a>
        </ul>
      )}
    </Fragment>
  );
};

export default UserSettings;
