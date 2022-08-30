import UserItem from "./UserItem";
import Card from "../../shared/UI/Card";
import styles from "./UsersList.module.css";

const UsersList = (props) => {
  if (props.usersData.length === 0) {
    return (
      <div className="centered">
        <Card>
          <h2>No Users Found</h2>
        </Card>
      </div>
    );
  }
  return (
    <div className={styles["users-list"]}>
      {props.usersData.map((user) => (
        <UserItem
          key={user._id}
          id={user._id}
          firstName={user.firstName}
          lastName={user.lastName}
          speciesCount={user.species.length}
          profileImg={user.profileImg}
        />
      ))}
    </div>
  );
};

export default UsersList;
