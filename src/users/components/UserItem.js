import styles from "./UserItem.module.css";
import Avatar from "../../shared/UI/Avatar";
import Card from "../../shared/UI/Card";

import { Link } from "react-router-dom";

const UserItem = (props) => {
  return (
    <li className={styles["user-item"]}>
      <Card className={styles["user-item__content"]}>
        <Link to={`/users/${props.id}`}>
          <div className={styles["user-item__image"]}>
            <Avatar
              src={`${process.env.REACT_APP_BACKEND_URL}/${props.profileImg}`}
              alt={props.firstName}
            />
          </div>
          <div className={styles["user-item__info"]}>
            <h2>
              {props.firstName} {props.lastName}
            </h2>
            <h3>{props.speciesCount} Species Documented</h3>
          </div>
        </Link>
      </Card>
    </li>
  );
};

export default UserItem;
