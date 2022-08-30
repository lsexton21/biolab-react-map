import React, { Fragment, useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Input from "../../shared/form-elements/Input";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../../shared/form-elements/validators";
import Card from "../../shared/UI/Card";
import Button from "../../shared/form-elements/Button";
import CoordinatesUpload from "../../shared/form-elements/CoordinatesUpload";
import TaxaSelection from "../../shared/form-elements/TaxaSelection";
import { useForm } from "../../shared/hooks/formHook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import AuthContext from "../../shared/context/auth-context";

import styles from "./EditSpecies.module.css";
import LoadingSpinner from "../../shared/UI/LoadingSpinner";
import ErrorModal from "../../shared/errors/ErrorModal";

const EditSpecies = (props) => {
  const [loadedSpecies, setLoadedSpecies] = useState();
  const { sendRequest, isLoading, clearError, error } = useHttpClient();
  const authCtx = useContext(AuthContext);
  const userId = useParams().userId;

  let navigate = useNavigate();
  const speciesId = useParams().speciesId;

  const identifiedSpecies = props.speciesData.find(
    (species) => species.id === speciesId
  );

  const [formState, inputHandler, setFormData] = useForm(
    {
      commonName: {
        value: "",
        isValid: false,
      },
      scientificName: {
        value: "",
        isValid: true,
      },
      description: {
        value: "",
        isValid: false,
      },
      dateFound: {
        value: "",
        isValid: false,
      },
      coordinates: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  useEffect(() => {
    const fetchSpecies = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/api/species/${speciesId}`,
          "GET",
          { Authorization: "Bearer " + authCtx.token }
        );
        setLoadedSpecies(responseData.species);
        setFormData(
          {
            commonName: {
              value: responseData.species.commonName,
              isValid: true,
            },
            scientificName: {
              value: responseData.species.scientificName,
              isValid: true,
            },
            description: {
              value: responseData.species.description,
              isValid: true,
            },
            dateFound: {
              value: responseData.species.dateFound,
              isValid: false,
            },
            coordinates: {
              value: responseData.species.coordinates,
              isValid: true,
            },
            taxa: {
              value: responseData.species.taxa,
              isValid: true,
            },
          },
          true
        );
      } catch (err) {}
    };
    fetchSpecies();
  }, [sendRequest, identifiedSpecies, setFormData]);

  const speciesSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/api/species/${speciesId}`,
        "PATCH",
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + authCtx.token,
        },
        JSON.stringify({
          speciesId,
          commonName: formState.inputs.commonName.value,
          scientificName: formState.inputs.scientificName.value,
          description: formState.inputs.description.value,
          dateFound: formState.inputs.dateFound.value,
          lat: formState.inputs.coordinates.value.lat,
          lng: formState.inputs.coordinates.value.lng,
          taxa: formState.inputs.taxa.value,
        })
      );
      navigate(`/users/${userId}/myspecies`);
      window.location.reload(false);
    } catch (err) {
      console.log(err);
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!loadedSpecies && !error) {
    return (
      <div className="center">
        <Card>
          <h2>Could not find a species!{speciesId}</h2>
        </Card>
      </div>
    );
  }

  return (
    <Fragment>
      <ErrorModal error={error} onClick={clearError} />
      {!isLoading && loadedSpecies && (
        <form
          className={styles["species-form"]}
          onSubmit={speciesSubmitHandler}
        >
          <Input
            id="commonName"
            element="input"
            type="text"
            label="Common Name or Type of Species"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid common name."
            onInput={inputHandler}
            initialValue={loadedSpecies.commonName}
            initialValid={true}
          ></Input>
          <Input
            id="scientificName"
            element="input"
            type="text"
            label="What is the scientific name of your species (not required)"
            validators={[]}
            errorText="Please enter a valid scientific name."
            onInput={inputHandler}
            initialValue={loadedSpecies.scientificName}
            initialValid={true}
          ></Input>
          <Input
            id="description"
            element="textarea"
            label="In one sentence, describe specific details that you can observe of your species"
            validators={[VALIDATOR_MINLENGTH(5), VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid description (at least 5 characters)."
            onInput={inputHandler}
            initialValue={loadedSpecies.description}
            initialValid={true}
          />
          <Input
            id="dateFound"
            element="input"
            type="date"
            label="On which date did you find your specimen?"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid date."
            onInput={inputHandler}
            initialValue={loadedSpecies.dateFound}
            initialValid={true}
          />
          <CoordinatesUpload
            id="coordinates"
            label="Input the coordinates of where you found your species"
            onInput={inputHandler}
            initialValue={loadedSpecies.coordinates}
            initialValid={true}
          />
          <TaxaSelection
            id="taxa"
            label="Select each category that applies to your species"
            onInput={inputHandler}
            initialValue={loadedSpecies.taxa}
            initialValid={true}
          />
          <Button
            style={{ width: "100%" }}
            type="submit"
            disabled={!formState.isValid}
          >
            UPDATE SPECIES
          </Button>
        </form>
      )}
    </Fragment>
  );
};

export default EditSpecies;
