import { Fragment, useState } from "react";
import styles from "./SpeciesProfile.module.css";

import { useParams, Link, useOutletContext } from "react-router-dom";
import LoadingSpinner from "../../shared/UI/LoadingSpinner";

import CreatorInfo from "../components/CreatorInfo";

import { useEffect } from "react";

const SpeciesProfile = (props) => {
  const [bumpSpecies, setBumpSpecies] = useState(false);
  const [showSpeciesContainer, setShowSpeciesContainer] = useOutletContext();
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
    if (props.speciesData) {
      filteredSpeciesData = props.speciesData.filter(
        (species) => species._id === params.speciesId
      );
      filteredUserData = props.usersData.filter(
        (user) => user._id === filteredSpeciesData[0].creators[0]
      );
    }
    const timer = setTimeout(() => {
      setBumpSpecies(false);
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [params]);

  return (
    <Fragment>
      {filteredSpeciesData ? (
        <div
          className={`${styles.speciesProfileContainer} ${
            bumpSpecies ? styles.bumpSpecies : ""
          }`}
        >
          <div className={styles.speciesImgContainer}>
            <Link
              to={`/`}
              onClick={() => {
                setShowSpeciesContainer(false);
              }}
              className={styles.speciesProfileCancel}
            >
              X
            </Link>
            <img
              src={`${process.env.REACT_APP_AWS_URL}/${filteredSpeciesData[0].imgs.keyImg.source}`}
              alt={filteredSpeciesData[0].commonName}
              className={styles.speciesImg}
            />
          </div>
          <div className={styles.speciesInfoContainer}>
            <div className={styles.speciesNamesContainer}>
              <h3 className={styles.speciesCommonName}>
                {filteredSpeciesData[0].commonName}
              </h3>
              <div className={styles.speciesNamesDivider} />
              <h3 className={styles.speciesScientificName}>
                {filteredSpeciesData[0].scientificName}
              </h3>
            </div>
            <div className={styles.control_body__observations}>
              <h4>Observations:</h4>
              <p>{filteredSpeciesData[0].description}</p>
            </div>
            <div className={styles.userProfileContainer}>
              <span>Sample prepared and photographed by:</span>
              <div className={styles.userProfiles}>
                <CreatorInfo filteredUserData={filteredUserData} />
              </div>
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
