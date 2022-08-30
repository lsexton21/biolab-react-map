import { Link } from "react-router-dom";

import styles from "./SpeciesItem.module.css";
import Card from "../../shared/UI/Card";

const SpeciesItem = (props) => {
  console.log(props.image);
  return (
    <li className={styles["species-item"]}>
      <Card>
        <Link to={`${props.id}`}>
          <img
            src={`${process.env.REACT_APP_BACKEND_URL}/${props.keyImgSource}`}
            alt={props.commonName}
          />
          <h3>{props.commonName}</h3>
        </Link>
      </Card>
    </li>
  );
};

export default SpeciesItem;
