import { useState, useContext, Fragment, useEffect } from "react";

import styles from "./EditUser.module.css";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../shared/context/auth-context";
import { useForm } from "../../shared/hooks/formHook";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
  VALIDATOR_MAXLENGTH,
  VALIDATOR_EMAIL,
} from "../../shared/form-elements/validators";
import { useHttpClient } from "../../shared/hooks/http-hook";

import Input from "../../shared/form-elements/Input";
import Button from "../../shared/form-elements/Button";
import ErrorModal from "../../shared/errors/ErrorModal";
import ImageUpload from "../../shared/form-elements/ImageUpload";
import LoadingSpinner from "../../shared/UI/LoadingSpinner";

//Font Awesome imports
import { library } from "@fortawesome/fontawesome-svg-core";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const EditUser = (props) => {
  const { userId } = useParams();
  const { sendRequest, clearError, error, isLoading } = useHttpClient();
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);
  const [loadedUser, setLoadedUser] = useState();
  const [toggleRegistrationPage, setToggleRegistrationPage] = useState(false);
  const [formState, inputHandler, setFormData] = useForm(
    {
      firstName: {
        value: "",
        isValid: true,
      },
      lastName: {
        value: "",
        isValid: true,
      },
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
      image: {
        value: "",
        isValid: true,
      },
    },
    false
  );

  library.add(faArrowLeft, faArrowRight);

  const toggleRegistrationPageHandler = () => {
    setToggleRegistrationPage(!toggleRegistrationPage);
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/api/users/${userId}`,
          "GET",
          { Authorization: "Bearer " + authCtx.token }
        );
        console.log(responseData);
        setLoadedUser(responseData.user);
        setFormData(
          {
            firstName: {
              value: responseData.user.firstName,
              isValid: true,
            },
            lastName: {
              value: responseData.user.lastName,
              isValid: true,
            },
            image: {
              value: responseData.user.profileImg,
              isValid: true,
            },
          },
          true
        );
      } catch (err) {}
    };
    fetchUser();
  }, [sendRequest, setFormData]);

  const editUserSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/api/users/${userId}`,
        "PATCH",
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + authCtx.token,
        },
        JSON.stringify({
          firstName: formState.inputs.firstName.value,
          lastName: formState.inputs.lastName.value,
        })
      );
      navigate("");
      window.location.reload(false);
    } catch (err) {
      throw err;
    }
  };

  return (
    <Fragment>
      <ErrorModal error={error} onClick={clearError} />
      {!isLoading && loadedUser ? (
        <form className={styles["edit-form"]} onSubmit={editUserSubmitHandler}>
          <div className={styles.back} onClick={props.onShowAuth}>
            Back
          </div>
          <div className={styles.header}>Student Registration</div>
          <Input
            id="firstName"
            element="input"
            type="text"
            label="What is your preferred first name?"
            validators={[VALIDATOR_REQUIRE(), VALIDATOR_MAXLENGTH(20)]}
            errorText="Please enter a valid first name."
            onInput={inputHandler}
            initialValue={loadedUser.firstName}
            initialValid={true}
          ></Input>
          <Input
            id="lastName"
            element="input"
            type="text"
            label="What is your preferred last name?"
            validators={[VALIDATOR_REQUIRE(), VALIDATOR_MAXLENGTH(20)]}
            errorText="Please enter a valid last name."
            onInput={inputHandler}
            initialValue={loadedUser.lastName}
            initialValid={true}
          ></Input>
          <ImageUpload
            id="image"
            label="Choose a profile picture"
            onInput={inputHandler}
            errorText="Please upload a valid picture."
          />
          <div>
            <Button type="submit" disabled={!formState.isValid}>
              Update User
            </Button>
          </div>
        </form>
      ) : (
        <LoadingSpinner />
      )}
    </Fragment>
  );
};

export default EditUser;
