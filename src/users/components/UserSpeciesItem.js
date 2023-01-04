import { Fragment, useState, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import styles from "./UserSpeciesItem.module.css";
import Button from "../../shared/form-elements/Button";
import MapBox from "../../shared/UI/MapBox";
import AuthContext from "../../shared/context/auth-context";
import WarningModal from "../../shared/UI/WarningModal";
import Modal from "../../shared/UI/Modal";
import { useHttpClient } from "../../shared/hooks/http-hook";

const UserSpeciesItem = (props) => {
  const [mapModal, setMapModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [speciesInfo, setSpeciesInfo] = useState(false);
  const navigate = useNavigate();
  const userId = useParams().userId;
  const { sendRequest, clearError, isLoading, error } = useHttpClient();

  const date = new Date(props.dateFound);

  const convertedDate = new Date(date.getTime() + 86400000);

  const dateOptions = {
    month: "long",
    day: "numeric",
    year: "numeric",
  };

  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;

  const toggleMapModal = () => {
    setMapModal(!mapModal);
  };
  const toggleDeleteModal = () => {
    setDeleteModal(!deleteModal);
  };

  const deleteSpeciesHandler = async () => {
    setDeleteModal(!deleteModal);
    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/api/species/${props.id}`,
        "DELETE",
        { Authorization: "Bearer " + authCtx.token }
      );
      navigate(`/users/${userId}/myspecies`);
      window.location.reload(false);
    } catch (err) {
      console.log(err);
    }
  };

  const showSpeciesInfoHandler = () => {
    setSpeciesInfo(!speciesInfo);
  };

  return (
    <Fragment>
      {deleteModal && (
        <WarningModal
          show={toggleDeleteModal}
          onClick={toggleDeleteModal}
          onCancel={toggleDeleteModal}
          header="Are you sure?"
        >
          <div>
            <h3>
              Are you sure you want to delete your {props.commonName} entry?
              Warning! You can not undo this action.
            </h3>
            <footer
              style={{
                marginTop: "2rem",
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Button danger onClick={deleteSpeciesHandler}>
                DELETE
              </Button>
            </footer>
          </div>
        </WarningModal>
      )}
      {mapModal && (
        <Modal
          background={"solidWhite"}
          onCancel={toggleMapModal}
          show={mapModal}
          onClick={toggleMapModal}
          header={props.commonName}
        >
          <div className={styles["moreInfo-container"]}>
            <MapBox center={props.coordinates} zoom={17} />
          </div>
        </Modal>
      )}
      <li onClick={showSpeciesInfoHandler} className={styles["species-item"]}>
        {speciesInfo ? (
          <div className={styles["species-item__infoContainer"]}>
            <div className={styles["species-item__info"]}>
              <div className={styles["species-item__observationContainer"]}>
                <div className={styles.backButtonContainer}>
                  <button
                    className={styles.backButton}
                    onClick={showSpeciesInfoHandler}
                  >
                    X
                  </button>
                </div>
                <h3>Observations:</h3>
                <p>{props.description}</p>
              </div>
              <Button
                style={{ marginBottom: "0.5rem" }}
                secondary
                onClick={toggleMapModal}
              >
                SEE LOCATION FOUND
              </Button>
            </div>
            <div className={styles["species-item__actions"]}>
              {isLoggedIn && (
                <Fragment>
                  <Link
                    style={{ textDecoration: "none" }}
                    to={`${props.id}/edit`}
                  >
                    <Button onClick={props.onEditModal}>EDIT</Button>
                  </Link>
                  <Button onClick={toggleDeleteModal} danger>
                    DELETE
                  </Button>
                </Fragment>
              )}
            </div>
          </div>
        ) : (
          <div className={styles["species-item__info"]}>
            <div className={styles["species-item__title"]}>
              <h2>{props.commonName}</h2>
              <h3>{convertedDate.toLocaleDateString("en-us", dateOptions)}</h3>
            </div>
            <img
              className={styles["species-item__image"]}
              src={`${process.env.REACT_APP_AWS_URL}/${props.img}`}
              alt={props.commonName}
            />
            <div className={styles.taxaContainer}>
              {props.taxa.map((type) => (
                <div key={type} className={styles.taxa}>
                  {type}
                </div>
              ))}
            </div>
          </div>
        )}
      </li>
    </Fragment>
  );
};

export default UserSpeciesItem;
