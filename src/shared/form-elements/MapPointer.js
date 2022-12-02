import { useRef, useState, Fragment } from "react";
import { Map, Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import styles from "./MapPointer.module.css";

import Button from "./Button";

const MapPointer = (props) => {
  const [showMarker, setShowMarker] = useState(false);
  const [coordinates, setCoordinates] = useState({});
  const mapRef = useRef();

  let initialViewState;
  if (props.initialValue) {
    initialViewState = {
      longitude: props.initialValue.lng,
      latitude: props.initialValue.lat,
      zoom: 16,
      pitch: 50,
      bearing: 10,
    };
  } else {
    initialViewState = {
      longitude: -117.216941,
      latitude: 32.732314,
      zoom: 16,
      pitch: 50,
      bearing: 10,
    };
  }
  const [viewState, setViewState] = useState(initialViewState);

  const panTo = (location) => {
    mapRef.current.panTo([location.lng, location.lat], {
      duration: 2000,
    });
  };

  const addMarkerHandler = (event) => {
    setCoordinates(event.lngLat);
    setShowMarker(true);
    panTo(event.lngLat);
    props.onInput({ lat: event.lngLat.lat, lng: event.lngLat.lng });
  };

  return (
    <Fragment>
      <div className={styles["map-container"]}>
        <Map
          ref={mapRef}
          onClick={addMarkerHandler}
          initialViewState={viewState}
          onMove={(evt) => setViewState(evt.viewState)}
          mapStyle="mapbox://styles/mapbox/satellite-v9"
          mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        >
          {!showMarker && (
            <Marker
              latitude={initialViewState.latitude}
              longitude={initialViewState.longitude}
            />
          )}
          {showMarker && coordinates && (
            <Marker longitude={coordinates.lng} latitude={coordinates.lat} />
          )}
        </Map>
      </div>
      <div className={styles.footer}>
        <Button onClick={props.onSelect}>OK</Button>
      </div>
    </Fragment>
  );
};
export default MapPointer;
