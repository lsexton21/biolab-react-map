import { Fragment, useState, useEffect } from "react";
import { Outlet, Link } from "react-router-dom";
import MapBoxAllSpecies from "../components/MapBoxAllSpecies";
import SpeciesList from "../components/SpeciesList";
import styles from "./AllSpecies.module.css";
import { useHttpClient } from "../../shared/hooks/http-hook";
import ErrorModal from "../../shared/errors/ErrorModal";
import LoadingSpinner from "../../shared/UI/LoadingSpinner";

const AllSpecies = (props) => {
  const [speciesData, setSpeciesData] = useState();
  const { sendRequest, clearError, isLoading, error } = useHttpClient();

  useEffect(() => {
    const fetchSpecies = async () => {
      try {
        const responseData = await sendRequest(
          process.env.REACT_APP_BACKEND_URL + "/api/species"
        );
        setSpeciesData(responseData.species);
        console.log(responseData.species);
      } catch (err) {}
    };
    fetchSpecies();
  }, [sendRequest]);

  return (
    <Fragment>
      <ErrorModal show={error} onClick={clearError} />
      {!isLoading && speciesData ? (
        <Fragment>
          <h2>This page documents all the species collected</h2>
          <div className={styles["species-container"]}>
            <MapBoxAllSpecies items={speciesData} />
            <div>
              <Link to="/species/new">ADD SPECIES</Link>
              <SpeciesList items={speciesData} />
            </div>
          </div>
          <Outlet />
        </Fragment>
      ) : (
        <LoadingSpinner />
      )}
    </Fragment>
  );
};

export default AllSpecies;
