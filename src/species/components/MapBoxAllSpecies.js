import { Fragment, useState } from "react";
import Map, { Marker } from "react-map-gl";
import Modal from "../../shared/UI/Modal";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faBug, faLocationPin } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styles from "./MapBoxAllSpecies.module.css";

const mapBoxToken =
  "pk.eyJ1IjoibHNleHRvbiIsImEiOiJjbDBwZm5hcXcxN3hmM2NwMnoyMTMyZTBkIn0.FKV_JjtzrGlGO4yR6_d_Hg";

const MapBoxAllSpecies = (props) => {
  const [markerOverlay, setMarkerOverlay] = useState(false);
  const [customMsg, setCustomMsg] = useState("");

  library.add(faBug, faLocationPin);

  const markerHandler = (event) => {
    setMarkerOverlay(!markerOverlay);
  };

  return (
    <Fragment>
      {markerOverlay && (
        <Modal show={markerOverlay} onClick={markerHandler}>
          <div>{customMsg}</div>
        </Modal>
      )}
      <div className={styles.map}>
        <Map
          initialViewState={{
            longitude: -117.217767,
            latitude: 32.732801,
            zoom: 16,
          }}
          mapStyle="mapbox://styles/mapbox/satellite-v9"
          mapboxAccessToken={mapBoxToken}
        >
          <Marker
            onClick={(event) => {
              setCustomMsg("This is HTHI");
              setMarkerOverlay(!markerOverlay);
            }}
            longitude={-117.218903}
            latitude={32.733404}
          >
            <div className={styles.marker}>
              <FontAwesomeIcon
                icon="fa-solid fa-location-pin"
                className={styles["locationPin__hthi"]}
                anchor="bottom"
              />
              <img
                className={styles["marker-icon__hthi"]}
                src="https://www.hightechhigh.org/hthi/wp-content/uploads/sites/18/2021/09/HTHOG-2.0_HTHI.svg"
                alt="HTHI logo"
              />
            </div>
          </Marker>
          {props.items.map((species) => (
            <Marker
              key={species._id}
              onClick={() => {
                setCustomMsg(species.commonName);
                setMarkerOverlay(!markerOverlay);
              }}
              longitude={species.locationFound.lng}
              latitude={species.locationFound.lat}
              className={styles.marker}
            >
              <div className={styles.marker}>
                <FontAwesomeIcon
                  icon="fa-solid fa-location-pin"
                  className={styles["locationPin__entomology"]}
                />
                <FontAwesomeIcon
                  icon="fa-solid fa-bug"
                  className={styles["marker-icon__entomology"]}
                />
              </div>
            </Marker>
          ))}
        </Map>
      </div>
    </Fragment>
  );
};

export default MapBoxAllSpecies;
