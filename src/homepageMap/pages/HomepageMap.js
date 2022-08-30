import { Fragment, useContext, useState, useRef, useEffect } from "react";
import { Outlet, Link } from "react-router-dom";

//Components
import WelcomeDirections from "../components/WelcomeDirections";
import AuthContext from "../../shared/context/auth-context";
import { useHttpClient } from "../../shared/hooks/http-hook";
import ErrorModal from "../../shared/errors/ErrorModal";
import LoadingSpinner from "../../shared/UI/LoadingSpinner";

//Marker Icon Imports
import Marine from "../images/marineMarker.png";
import Plants from "../images/plantMarker.png";
import Insects from "../images/insectMarker.png";
import Other from "../images/otherMarker.png";
import Humans from "../images/humanMarker.png";

//mapbox
import { Map, Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import styles from "./HomepageMap.module.css";

const HomepageMap = (props) => {
  const mapRef = useRef();
  const [startUp, setStartUp] = useState(true);
  const [showSpeciesContainer, setShowSpeciesContainer] = useState(false);
  const [closeWelcomeMsg, setCloseWelcomeMsg] = useState(false);
  const authCtx = useContext(AuthContext);
  const [displayMarkers, setDisplayMarkers] = useState(!!authCtx.isLoggedIn);
  const { clearError, error, isLoading } = useHttpClient();

  const initialViewState = () => {
    if (!authCtx.isLoggedIn) {
      return {
        longitude: -117.216941,
        latitude: 32.732314,
        zoom: 14.8,
        pitch: 50,
        bearing: 70,
      };
    } else {
      return {
        longitude: -117.216941,
        latitude: 32.732314,
        zoom: 17,
        pitch: 50,
        bearing: 10,
      };
    }
  };
  const [viewState, setViewState] = useState(initialViewState);

  useEffect(() => {
    setTimeout(() => {
      setDisplayMarkers(true);
    }, 5500);
  }, []);

  const taxaMarkerHandler = (taxa) => {
    if (taxa === "Insects") {
      return Insects;
    } else if (taxa === "Plants") {
      return Plants;
    } else if (taxa === "Marine") {
      return Marine;
    } else if (taxa === "Humans") {
      return Humans;
    } else {
      return Other;
    }
  };

  const markerHandler = () => {
    setCloseWelcomeMsg(true);
    const timer = setTimeout(() => {
      setShowSpeciesContainer(true);
      setStartUp(false);
    }, 300);
    return () => {
      clearTimeout(timer);
    };
  };

  const delayRandomizer = (taxa) => {
    if (taxa === "Insects") {
      return "0.2s";
    } else if (taxa === "Plants") {
      return "0.3s";
    } else if (taxa === "Marine") {
      return "0.4s";
    } else if (taxa === "Humans") {
      return "0.5s";
    } else {
      return "0.6s";
    }
  };

  const panTo = (location) => {
    mapRef.current.panTo([location.lng + 0.001, location.lat], {
      duration: 2000,
    });
  };
  return (
    <Fragment>
      <ErrorModal show={error} onClick={clearError} />
      {isLoading || (!props.speciesData && <LoadingSpinner />)}
      {!isLoading && props.speciesData && (
        <div className={styles["map-container"]}>
          <Map
            ref={mapRef}
            onLoad={(e) =>
              e.target.flyTo({ zoom: 17, bearing: 10, duration: 10000 })
            }
            initialViewState={viewState}
            onMove={(evt) => setViewState(evt.viewState)}
            mapStyle="mapbox://styles/mapbox/satellite-v9"
            mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
          >
            {startUp && !authCtx.isLoggedIn && (
              <aside className={styles.welcomeDirectionsAsideContainer}>
                <WelcomeDirections hide={closeWelcomeMsg} />
              </aside>
            )}

            {showSpeciesContainer && (
              <aside className={styles.speciesProfileAsideContainer}>
                <div className={styles.speciesProfileAside}>
                  <Outlet />
                </div>
              </aside>
            )}

            {displayMarkers && (
              <Marker
                onClick={(e) => {
                  panTo(e.target._lngLat);
                }}
                longitude={-117.219}
                latitude={32.7332}
              >
                <div className={styles.marker}>
                  <img
                    className={styles["marker-icon__hthi"]}
                    src="https://www.hightechhigh.org/hthi/wp-content/uploads/sites/18/2021/09/HTHOG-2.0_HTHI.svg"
                    alt="HTHI logo"
                  />
                </div>
              </Marker>
            )}

            {displayMarkers &&
              props.speciesData.map((species) => (
                <Marker
                  key={species._id}
                  onClick={(e) => {
                    markerHandler();
                    panTo(e.target._lngLat);
                  }}
                  longitude={species.coordinates.lng}
                  latitude={species.coordinates.lat}
                >
                  <Link to={`/species/${species._id}`}>
                    <div
                      className={styles.marker}
                      style={{
                        animationDelay: delayRandomizer(species.taxa[0]),
                      }}
                    >
                      <div className={styles.markerShadow}></div>
                      <img
                        className={styles.markerIcon}
                        src={taxaMarkerHandler(species.taxa[0])}
                      ></img>
                    </div>
                  </Link>
                </Marker>
              ))}
          </Map>
          <div className={styles.sidebar}>
            <span>
              Longitude: {viewState.longitude.toFixed(6)} | Latitude:{" "}
              {viewState.latitude.toFixed(6)}
            </span>
            <span> | Zoom: {viewState.zoom.toFixed(1)}</span>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default HomepageMap;
