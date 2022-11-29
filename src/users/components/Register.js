import { useState, Fragment, useContext } from "react";

import styles from "./Register.module.css";

import { useNavigate } from "react-router-dom";
import AuthContext from "../../shared/context/auth-context";
import { useForm } from "../../shared/hooks/formHook";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_CONFIRMPASSWORD,
  VALIDATOR_CLASSPASSCODE,
  VALIDATOR_MINLENGTH,
  VALIDATOR_MAXLENGTH,
  VALIDATOR_EMAIL,
} from "../../shared/form-elements/validators";
import { useHttpClient } from "../../shared/hooks/http-hook";

import Input from "../../shared/form-elements/Input";
import Button from "../../shared/form-elements/Button";
import ErrorModal from "../../shared/errors/ErrorModal";
import ImageUpload from "../../shared/form-elements/ImageUpload";

//Font Awesome imports
import { library } from "@fortawesome/fontawesome-svg-core";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LoadingSpinnerNew from "../../shared/UI/LoadingSpinnerNew";

const Register = (props) => {
  const { sendRequest, clearError, error, isLoading } = useHttpClient();
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);

  library.add(faArrowLeft, faArrowRight);

  const [formState, inputHandler, setFormData] = useForm(
    {
      firstName: {
        value: "",
        isValid: false,
      },
      lastName: {
        value: "",
        isValid: false,
      },
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
      confirmPassword: {
        value: "",
        isValid: false,
      },
      image: {
        value: "",
        isValid: true,
      },
      classPasscode: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const signupSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("firstName", formState.inputs.firstName.value);
      formData.append("lastName", formState.inputs.lastName.value);
      formData.append("email", formState.inputs.email.value);
      formData.append("password", formState.inputs.password.value);
      formData.append("image", formState.inputs.image.value);
      const newUser = await sendRequest(
        process.env.REACT_APP_BACKEND_URL + "/api/users/register",
        "POST",
        {},
        formData
      );
      authCtx.login(newUser.userId, newUser.token);
      navigate(`/users/${newUser.userId}/myspecies`);
      window.location.reload(false);
    } catch (err) {
      throw err;
    }
  };

  return (
    <Fragment>
      <ErrorModal
        onCancel={clearError}
        background="black"
        error={error}
        onClick={clearError}
      />
      <form
        className={styles["auth-form"]}
        onSubmit={signupSubmitHandler}
        autoComplete="off"
      >
        <div className={styles.header}>
          <div className={styles.backContainer}>
            <div className={styles.backButton} onClick={props.onShowAuth}>
              X
            </div>
          </div>
          <div className={styles.title}>Student Registration</div>
        </div>
        <div className={styles.registrationContainer}>
          <div className={styles.registrationPart1}>
            <Input
              id="firstName"
              element="input"
              type="text"
              label="What is your preferred first name?"
              validators={[VALIDATOR_REQUIRE(), VALIDATOR_MAXLENGTH(20)]}
              errorText="Please enter a valid first name."
              onInput={inputHandler}
            ></Input>
            <Input
              id="lastName"
              element="input"
              type="text"
              label="What is your preferred last name?"
              validators={[VALIDATOR_REQUIRE(), VALIDATOR_MAXLENGTH(20)]}
              errorText="Please enter a valid last name."
              onInput={inputHandler}
            ></Input>
            <Input
              id="email"
              element="input"
              type="email"
              label="What is your school email address?"
              validators={[VALIDATOR_REQUIRE(), VALIDATOR_EMAIL()]}
              errorText="Please enter a valid email address."
              onInput={inputHandler}
            ></Input>
            <Input
              id="password"
              element="input"
              type="password"
              label="Enter a password"
              validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]}
              errorText="Password must be a minimum of five characters long"
              onInput={inputHandler}
            ></Input>
            <Input
              id="confirmPassword"
              element="input"
              type="password"
              label="Confirm your password"
              validators={[
                VALIDATOR_REQUIRE(),
                VALIDATOR_CONFIRMPASSWORD(formState.inputs.password.value),
              ]}
              errorText="Passwords do not match"
              onInput={inputHandler}
            ></Input>
          </div>
          <div className={styles.registrationPart2}>
            <ImageUpload
              id="image"
              label="Choose a profile picture (optional)"
              onInput={inputHandler}
              errorText="Please upload a valid picture."
            />
            <Input
              id="classPasscode"
              inputStyle={{
                borderRadius: "2rem",
                width: "10rem",
                fontSize: "2rem",
                background: "#d3e6f7",
                textAlign: "center",
              }}
              containerStyle={{
                marginTop: "1rem",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
              element="input"
              type="text"
              label="What is your class passcode?"
              validators={[VALIDATOR_REQUIRE(), VALIDATOR_CLASSPASSCODE()]}
              errorText="Please enter a valid passcode provided by your teacher."
              onInput={inputHandler}
            ></Input>
          </div>
        </div>
        {isLoading && <LoadingSpinnerNew />}
        <Button
          style={{ width: "100%" }}
          type="submit"
          disabled={!formState.isValid}
        >
          REGISTER
        </Button>
      </form>
    </Fragment>
  );
};

export default Register;
