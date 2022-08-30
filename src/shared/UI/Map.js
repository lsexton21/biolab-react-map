import { useRef, useEffect } from "react";
import styles from "./Map.module.css";

const Map = (props) => {
  const mapRef = useRef();
  const { center, zoom } = props;

  let map;

  useEffect(() => {
    map = new window.google.maps.Map(mapRef.current, {
      center,
      zoom,
      mapTypeId: "satellite",
    });

    new window.google.maps.Marker({ position: center, map: map });
  }, [center, zoom]);

  return (
    <div
      className={`${styles.map} ${props.className}`}
      style={props.style}
      ref={mapRef}
    ></div>
  );
};

export default Map;
