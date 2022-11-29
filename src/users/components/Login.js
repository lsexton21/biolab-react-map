import { useContext, Fragment } from "react";

import styles from "./Login.module.css";

import { useNavigate } from "react-router-dom";
import AuthContext from "../../shared/context/auth-context";
import { useForm } from "../../shared/hooks/formHook";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
  VALIDATOR_EMAIL,
} from "../../shared/form-elements/validators";
import { useHttpClient } from "../../shared/hooks/http-hook";

import Input from "../../shared/form-elements/Input";
import Button from "../../shared/form-elements/Button";
import ErrorModal from "../../shared/errors/ErrorModal";
import LoadingSpinnerNew from "../../shared/UI/LoadingSpinnerNew";

const Login = (props) => {
  const { sendRequest, clearError, error, isLoading } = useHttpClient();
  if (!!error) {
    console.log(error);
  }
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);
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

  const [formState, inputHandler] = useForm(
    {
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  return (
    <Fragment>
      <ErrorModal error={error} onClick={clearError} />
      <form className={styles["auth-form"]} onSubmit={loginSubmitHandler}>
        <div className={styles.header}>
          <div className={styles.backContainer}>
            <div className={styles.backButton} onClick={props.onShowAuth}>
              X
            </div>
          </div>
          <div className={styles.title}>Student Login</div>
        </div>
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
        {isLoading && <LoadingSpinnerNew />}
        <Button
          style={{ marginBottom: "1rem" }}
          type="submit"
          disabled={!formState.isValid}
        >
          LOGIN
        </Button>
        <Button onClick={props.onShowRegister} secondary>
          NEED TO REGISTER?
        </Button>
      </form>
    </Fragment>
  );
};

export default Login;
