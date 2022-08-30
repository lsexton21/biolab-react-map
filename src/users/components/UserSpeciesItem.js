import { Fragment, useState, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import styles from "./UserSpeciesItem.module.css";
import Button from "../../shared/form-elements/Button";
import MapBox from "../../shared/UI/MapBox";
import AuthContext from "../../shared/context/auth-context";
import WarningModal from "../../shared/UI/WarningModal";
import FormModal from "../../shared/UI/FormModal";
import { useHttpClient } from "../../shared/hooks/http-hook";

const UserSpeciesItem = (props) => {
  const [mapModal, setMapModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
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

  const [speciesInfo, setSpeciesInfo] = useState(false);

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
        `${process.env.REACT_APP_BACKEND_URL}/${props.id}`,
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
    setSpeciesInfo(true);
  };

  const hideSpeciesInfoHandler = () => {
    setSpeciesInfo(false);
  };

  return (
    <Fragment>
      {deleteModal && (
        <WarningModal
          show={toggleDeleteModal}
          onClick={toggleDeleteModal}
          header="Are you sure?"
          headerClass={styles["species-item__modal-header"]}
          contentClass={styles["species-item__modal-content"]}
          footerClass={styles["species-item__modal-actions"]}
        >
          <div>
            <p>
              Are you sure you want to delete your {props.commonName} entry?
              Warning! You can not undo this action.
            </p>
            <Fragment>
              <Button inverse onClick={toggleDeleteModal}>
                CANCEL
              </Button>
              <Button danger onClick={deleteSpeciesHandler}>
                DELETE
              </Button>
            </Fragment>
          </div>
        </WarningModal>
      )}
      {mapModal && (
        <FormModal
          show={toggleMapModal}
          onClick={toggleMapModal}
          header={props.commonName}
          contentClass={styles["species-item__modal-content"]}
          footerClass={styles["species-item__modal-actions"]}
          footer={<Button onClick={toggleMapModal}>Close</Button>}
        >
          <div className={styles["moreInfo-container"]}>
            <MapBox center={props.coordinates} zoom={17} />
          </div>
        </FormModal>
      )}
      <li
        onClick={showSpeciesInfoHandler}
        onMouseLeave={hideSpeciesInfoHandler}
        className={styles["species-item"]}
      >
        {speciesInfo ? (
          <div
            onClick={showSpeciesInfoHandler}
            className={styles["species-item__info"]}
          >
            <h2 style={{ borderBottom: "2px solid black", textAlign: "left" }}>
              Observations:
            </h2>
            <p>{props.description}</p>
            <Button onClick={toggleMapModal} inverse>
              SEE LOCATION FOUND
            </Button>
            <div className={styles["species-item__actions"]}>
              {isLoggedIn && (
                <Fragment>
                  <Link to={`${props.id}/edit`}>
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
              src={`${process.env.REACT_APP_BACKEND_URL}/${props.img}`}
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
