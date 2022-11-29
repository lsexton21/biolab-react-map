import { Fragment, useState } from "react";
import {
  Outlet,
  useNavigate,
  useParams,
  NavLink,
  useOutletContext,
} from "react-router-dom";
import UserSpeciesItem from "./UserSpeciesItem";

import styles from "./MySpecies.module.css";
import LoadingSpinner from "../../shared/UI/LoadingSpinner";
import { useHttpClient } from "../../shared/hooks/http-hook";
import ErrorModal from "../../shared/errors/ErrorModal";

const MySpecies = (props) => {
  const { clearError, error, isLoading } = useHttpClient();
  const [editSpecies, setEditSpecies] = useState(false);

  let navigate = useNavigate();
  const userId = useParams().userId;

  const editSpeciesHandler = () => {
    setEditSpecies(!editSpecies);
  };

  const filteredSpeciesData = props.speciesData.filter(
    (species) => species.creators[0] === userId
  );

  if (filteredSpeciesData.length === 0) {
    return (
      <Fragment>
        <h3>You currently have no documented species. Try adding one.</h3>
        <NavLink
          to={`/users/${userId}/newspecies`}
          className={styles.addSpeciesLink}
          style={{ fontSize: "1.5rem" }}
        >
          + Add Species
        </NavLink>
      </Fragment>
    );
  }

  return (
    <Fragment>
      <ErrorModal show={error} onClick={clearError} />
      {isLoading || (!props.speciesData && <LoadingSpinner />)}
      {editSpecies && <Outlet context={[editSpecies, setEditSpecies]} />}
      {!isLoading && filteredSpeciesData ? (
        <div className={styles["species-list"]}>
          {filteredSpeciesData.map((species) => (
            <UserSpeciesItem
              key={species._id}
              id={species._id}
              img={species.imgs.keyImg.source}
              commonName={species.commonName}
              dateFound={species.dateFound}
              description={species.description}
              coordinates={species.coordinates}
              taxa={species.taxa}
              onEditModal={editSpeciesHandler}
            />
          ))}
        </div>
      ) : (
        <h2>
          You have no documented species. Try adding one by clicking the add
          species tab above.
        </h2>
      )}
    </Fragment>
  );
};

export default MySpecies;
