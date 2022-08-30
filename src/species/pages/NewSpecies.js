import React, { Fragment, useContext, useState } from "react";
import { useForm } from "../../shared/hooks/formHook";
import Input from "../../shared/form-elements/Input";
import ImageUpload from "../../shared/form-elements/ImageUpload";
import CoordinatesUpload from "../../shared/form-elements/CoordinatesUpload";
import TaxaSelection from "../../shared/form-elements/TaxaSelection";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../../shared/form-elements/validators";
import Button from "../../shared/form-elements/Button";
import styles from "./NewSpecies.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { useHttpClient } from "../../shared/hooks/http-hook";
import ErrorModal from "../../shared/errors/ErrorModal";
import AuthContext from "../../shared/context/auth-context";

const NewSpecies = (props) => {
  const { sendRequest, clearError, isLoading, error } = useHttpClient();
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);
  const userId = useParams().userId;

  const [formState, inputHandler] = useForm(
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
      image: {
        value: null,
        isValid: false,
      },
      coordinates: {
        value: "",
        isValid: false,
      },
      taxa: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const speciesSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("creators", authCtx.userId);
      formData.append("commonName", formState.inputs.commonName.value);
      formData.append("scientificName", formState.inputs.scientificName.value);
      formData.append("description", formState.inputs.description.value);
      formData.append("dateFound", formState.inputs.dateFound.value);
      formData.append("image", formState.inputs.image.value);
      formData.append("lat", formState.inputs.coordinates.value.lat);
      formData.append("lng", formState.inputs.coordinates.value.lng);
      formData.append("taxa", formState.inputs.taxa.value);
      await sendRequest(
        process.env.REACT_APP_BACKEND_URL + "/api/species",
        "POST",
        { Authorization: "Bearer " + authCtx.token },
        formData
      );
      navigate(`/users/${userId}/myspecies`);
      window.location.reload(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Fragment>
      <ErrorModal error={error} onClick={clearError} />
      <form className={styles["species-form"]} onSubmit={speciesSubmitHandler}>
        <h2 className="centered">Add A New Species</h2>
        <Input
          id="commonName"
          element="input"
          type="text"
          label="Common Name or Type of Species"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid common name."
          onInput={inputHandler}
        ></Input>
        <Input
          id="scientificName"
          element="input"
          type="text"
          label="What is the scientific name of your species (not required)"
          validators={[]}
          initialValid={true}
          errorText="Please enter a valid scientific name."
          onInput={inputHandler}
        ></Input>
        <Input
          id="description"
          element="textarea"
          label="In one sentence, describe specific details that you can observe of your species"
          validators={[VALIDATOR_MINLENGTH(5), VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid description (at least 5 characters)."
          onInput={inputHandler}
        />
        <Input
          id="dateFound"
          element="input"
          type="date"
          label="On which date did you find your specimen?"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid date."
          onInput={inputHandler}
        />
        <ImageUpload
          id="image"
          label="Choose an image of your specimen."
          onInput={inputHandler}
          errorText="Please upload a valid picture."
        />
        <CoordinatesUpload
          id="coordinates"
          label="Input the coordinates of where you found your species"
          onInput={inputHandler}
          initialValue={{ lat: 32.733300574939676, lng: -117.21914785687474 }}
        />
        <TaxaSelection
          id="taxa"
          label="Select each category that applies to your species"
          onInput={inputHandler}
          errorText="Please select at least one category"
        />
        <Button
          style={{ width: "100%" }}
          type="submit"
          disabled={!formState.isValid}
        >
          ADD SPECIES
        </Button>
      </form>
    </Fragment>
  );
};

export default NewSpecies;
