import { useState, useEffect, useReducer, Fragment } from "react";
import styles from "./CoordinatesUpload.module.css";
import Button from "./Button";
import { validate } from "../form-elements/validators";
import "../form-elements/Input.css";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MIN,
  VALIDATOR_MAX,
} from "../../shared/form-elements/validators";

//Font Awesome imports
import { library } from "@fortawesome/fontawesome-svg-core";
import { faLocationCrosshairs } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MapPointer from "../../shared/form-elements/MapPointer";
import ModalOnModal from "../../shared/UI/ModalOnModal";

const inputReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE":
      return {
        ...state,
        value: action.val,
        isValid: validate(action.val, action.validators),
      };
    case "TOUCH": {
      return {
        ...state,
        isTouched: true,
      };
    }
    default:
      return state;
  }
};

const CoordinatesUpload = (props) => {
  const [coordinatesModal, setCoordinatesModal] = useState(false);
  const [coordinatesValue, setCoordinatesValue] = useState({});

  useEffect(() => {
    if (props.initialValue) {
      setCoordinatesValue(props.initialValue);
    }
  }, []);
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.initialValue || "",
    isTouched: false,
    isValid: false || props.initialValid,
  });

  const { id, onInput } = props;
  const { isValid } = inputState;

  useEffect(() => {
    onInput(id, coordinatesValue, isValid);
  }, [coordinatesValue, onInput]);

  const openCoordinatesModalHandler = (e) => {
    e.preventDefault();
    setCoordinatesModal(true);
  };
  library.add(faLocationCrosshairs);

  const pickCoordinatesHandler = (event) => {
    dispatch({
      type: "CHANGE",
      val: event.lat,
      validators: [VALIDATOR_MIN(32), VALIDATOR_MAX(33)],
    });
    dispatch({
      type: "CHANGE",
      val: event.lng,
      validators: [VALIDATOR_MIN(-118), VALIDATOR_MAX(-117)],
    });
    setCoordinatesValue(event);
  };

  const closeCoordinatesModalHandler = () => {
    setCoordinatesModal(false);
  };

  const latChangeHandler = (event) => {
    dispatch({
      type: "CHANGE",
      val: event.target.value,
      validators: [VALIDATOR_MIN(32), VALIDATOR_MAX(33), VALIDATOR_REQUIRE()],
    });
    let newCoordinates = { lat: event.target.value, lng: coordinatesValue.lng };
    setCoordinatesValue(newCoordinates);
  };

  const lngChangeHandler = (event) => {
    dispatch({
      type: "CHANGE",
      val: event.target.value,
      validators: [
        VALIDATOR_MIN(-118),
        VALIDATOR_MAX(-117),
        VALIDATOR_REQUIRE(),
      ],
    });
    let newCoordinates = { lat: coordinatesValue.lat, lng: event.target.value };
    setCoordinatesValue(newCoordinates);
  };

  const touchHandler = () => {
    dispatch({
      type: "TOUCH",
    });
  };

  return (
    <Fragment>
      {coordinatesModal && (
        <ModalOnModal
          background={"white"}
          show={coordinatesModal}
          onClick={closeCoordinatesModalHandler}
          header="Please Pinpoint Your Desired Coordinates"
          onCancel={closeCoordinatesModalHandler}
        >
          <MapPointer
            onInput={pickCoordinatesHandler}
            onSelect={closeCoordinatesModalHandler}
            initialValue={coordinatesValue}
          />
        </ModalOnModal>
      )}
      <div className={styles.coordinates}>
        <div style={{ fontWeight: "bold" }}>{props.label}</div>
        <div className={styles.coordinatesControls}>
          <div className={styles.locationBtnContainer}>
            <Button
              style={{
                height: "50px",
                width: "50px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              onClick={openCoordinatesModalHandler}
            >
              <FontAwesomeIcon
                className={styles.locationBtn}
                icon="fa-solid fa-location-crosshairs"
              />
            </Button>
          </div>

          <div
            className={`form-control ${
              !inputState.isValid &&
              inputState.isTouched &&
              "form-control--invalid"
            }`}
          >
            <div className={styles.lngLat}>
              <label htmlFor={props.id}>Latitude:</label>
              <input
                className={styles.lat}
                id="lat"
                element="input"
                label="Latitude"
                placeholder={32.733300574939676}
                onChange={latChangeHandler}
                onBlur={touchHandler}
                value={coordinatesValue.lat}
              />
              {!inputState.isValid && inputState.isTouched && (
                <p>For San Diego, should be a number between 32 and 33</p>
              )}
              <label htmlFor={props.id}>Longitude:</label>
              <input
                className={styles.lng}
                id="lng"
                element="input"
                label="Longitude"
                placeholder={-117.21914785687474}
                onChange={lngChangeHandler}
                onBlur={touchHandler}
                value={coordinatesValue.lng}
              />
              {!inputState.isValid && inputState.isTouched && (
                <p>For San Diego, should be a number between -117 and -118</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default CoordinatesUpload;
