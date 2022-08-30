import { useState, useContext, Fragment } from "react";

import styles from "./Auth.module.css";
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

//Font Awesome imports
import { library } from "@fortawesome/fontawesome-svg-core";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Auth = (props) => {
  const { sendRequest, clearError, error, isLoading } = useHttpClient();
  const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);
  const [registerMode, setRegisterMode] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
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

  const loginSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const user = await sendRequest(
        process.env.REACT_APP_BACKEND_URL + "/api/users/login",
        "POST",
        {
          "Content-type": "application/json",
        },
        JSON.stringify({
          email: formState.inputs.email.value,
          password: formState.inputs.password.value,
        })
      );
      authCtx.login(user.userId, user.token);
      props.onShowAuth(false);
      navigate(`/users/${user.userId}/myspecies`);
    } catch (err) {
      throw err;
    }
  };

  const toggleAuthModesHandler = () => {
    if (registerMode) {
      setFormData(
        { ...formState.inputs, firstName: undefined, lastName: undefined },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData({
        ...formState.inputs,
        firstName: { value: "", isValid: false },
        lastName: { value: "", isValid: false },
      });
    }
    setRegisterMode(!registerMode);
  };

  const toggleRegistrationPageHandler = () => {
    setToggleRegistrationPage(!toggleRegistrationPage);
  };

  return (
    <Fragment>
      <ErrorModal error={error} onClick={clearError} />
      <div
        className={`${styles.authContainer} ${
          props.showAuth ? styles["auth-moveIn"] : styles["auth-moveOut"]
        }`}
      >
        {!registerMode ? (
          <form className={styles["auth-form"]} onSubmit={loginSubmitHandler}>
            <div className={styles.back} onClick={props.onShowAuth}>
              Back
            </div>
            <div className={styles.header}>Student Login</div>
            <Input
              id="email"
              element="input"
              type="email"
              label="Email Address"
              validators={[VALIDATOR_REQUIRE(), VALIDATOR_EMAIL()]}
              errorText="Please enter a valid email address."
              onInput={inputHandler}
            ></Input>
            <Input
              id="password"
              element="input"
              type="password"
              label="Password"
              validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]}
              errorText="Password must be a minimum of five characters long"
              onInput={inputHandler}
            ></Input>
            <Button type="submit" disabled={!formState.isValid}>
              LOGIN
            </Button>
            <Button inverse onClick={toggleAuthModesHandler}>
              NEED TO REGISTER?
            </Button>
          </form>
        ) : (
          <Fragment>
            <form
              className={styles["auth-form"]}
              onSubmit={signupSubmitHandler}
            >
              <div className={styles.back} onClick={props.onShowAuth}>
                Back
              </div>
              <div className={styles.header}>Student Registration</div>
              {!toggleRegistrationPage ? (
                <Fragment>
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
                    validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]}
                    errorText="Password must be a minimum of five characters long"
                    onInput={inputHandler}
                  ></Input>
                  <div onClick={toggleRegistrationPageHandler}>
                    <span className={styles.pagination}>Continue </span>
                    <FontAwesomeIcon
                      className={styles.pagination}
                      icon="fa-solid fa-arrow-right"
                    />
                  </div>
                </Fragment>
              ) : (
                <Fragment>
                  <ImageUpload
                    id="image"
                    label="Choose a profile picture"
                    onInput={inputHandler}
                    errorText="Please upload a valid picture."
                  />
                  <div onClick={toggleRegistrationPageHandler}>
                    <FontAwesomeIcon
                      icon="fa-solid fa-arrow-left"
                      className={styles.pagination}
                    />
                    <span className={styles.pagination}> Back</span>
                  </div>
                </Fragment>
              )}
              <div>
                <Button type="submit" disabled={!formState.isValid}>
                  REGISTER
                </Button>
                <Button onClick={toggleAuthModesHandler}>NEED TO LOGIN</Button>
              </div>
            </form>
          </Fragment>
        )}
      </div>
    </Fragment>
  );
};

export default Auth;
