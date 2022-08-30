import { useRef, useEffect } from "react";
import styles from "./MapBox.module.css";

import mapboxgl from "mapbox-gl/dist/mapbox-gl.js";

const MapBox = (props) => {
  const mapBoxRef = useRef();
  const { center, zoom } = props;

  mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

  let map;

  useEffect(() => {
    map = new mapboxgl.Map({
      container: mapBoxRef.current,
      style: "mapbox://styles/mapbox/satellite-v9",
      center,
      zoom,
    });
    new mapboxgl.Marker(mapBoxRef).setLngLat(center).addTo(map);
  });

  return (
    <div
      className={`${styles.mapBox} ${props.className}`}
      style={props.style}
      ref={mapBoxRef}
    ></div>
  );
};

export default MapBox;
