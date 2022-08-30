import styles from "./CreatorInfo.module.css";

const UserProfile = (props) => {
  return (
    <div className={styles.profile_container}>
      <div className={styles.profile_image}>
        <img
          src={`${process.env.REACT_APP_BACKEND_URL}/${props.filteredUserData[0].profileImg}`}
          alt="Profile Image"
        />
      </div>
      <div className={styles.profile_name}>
        <span>
          {props.filteredUserData[0].firstName}{" "}
          {props.filteredUserData[0].lastName[0]}.
        </span>
      </div>
    </div>
  );
};

export default UserProfile;
