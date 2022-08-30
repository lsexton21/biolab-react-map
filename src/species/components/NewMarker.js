import { useEffect, useRef } from "react";
import styles from "./NewMarker.module.css";

const NewMarkerDiv = (props) => {
  const { speciesImg, commonName } = props;

  return (
    <div className={styles.marker} style={props.style}>
      <img src={speciesImg} alt={commonName} width={50} height={50} />
    </div>
  );
};

export default NewMarkerDiv;
