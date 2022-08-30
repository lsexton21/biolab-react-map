import { Fragment, useState } from "react";
import styles from "./SpeciesProfile.module.css";

import { useParams } from "react-router-dom";
import LoadingSpinner from "../../shared/UI/LoadingSpinner";

import CreatorInfo from "../components/CreatorInfo";
import { faTasks } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";

const SpeciesProfile = (props) => {
  const [bumpSpecies, setBumpSpecies] = useState(false);
  const params = useParams();

  let filteredSpeciesData;
  let filteredUserData;

  if (props.speciesData) {
    filteredSpeciesData = props.speciesData.filter(
      (species) => species._id === params.speciesId
    );
    filteredUserData = props.usersData.filter(
      (user) => user._id === filteredSpeciesData[0].creators[0]
    );
  }

  useEffect(() => {
    setBumpSpecies(true);
    const timer = setTimeout(() => {
      setBumpSpecies(false);
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [params]);

  const currentSpecies = () => {
    return;
  };

  return (
    <Fragment>
      {filteredSpeciesData ? (
        <div
          className={`${styles.speciesProfileContainer} ${
            bumpSpecies ? styles.bumpSpecies : ""
          }`}
        >
          <div className={styles.speciesImgContainer}>
            <img
              src={`${process.env.REACT_APP_BACKEND_URL}/${filteredSpeciesData[0].imgs.keyImg.source}`}
              alt={filteredSpeciesData[0].commonName}
              className={styles.speciesImg}
            />
          </div>
          <div className={styles.speciesNamesContainer}>
            <div className={styles.speciesCommonName}>
              {filteredSpeciesData[0].commonName}
            </div>
            <div className={styles.speciesNamesDivider} />
            <div className={styles.speciesScientificName}>
              {filteredSpeciesData[0].scientificName}
            </div>
          </div>
          <div className={styles.control_body__observations}>
            <span>Observations:</span>
            <p>{filteredSpeciesData[0].description}</p>
          </div>
          <div className={styles.userProfileContainer}>
            <span>Sample prepared and photographed by:</span>
            <div className={styles.userProfiles}>
              <CreatorInfo filteredUserData={filteredUserData} />
            </div>
          </div>
        </div>
      ) : (
        <LoadingSpinner />
      )}
    </Fragment>
  );
};

export default SpeciesProfile;
