import { Fragment } from "react";
import styles from "./LoginForm.module.css";
import { useForm } from "../../shared/form-elements/formHook";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
  VALIDATOR_MAXLENGTH,
  VALIDATOR_EMAIL,
} from "../../shared/form-elements/validators";

import Input from "../../shared/form-elements/Input";
import Button from "../../shared/form-elements/Button";

const LoginForm = (props) => {
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

  const userSubmitHandler = (event) => {
    event.preventDefault();
    console.log(formState.inputs); // send this to the backend!
  };

  return (
    <Fragment>
      <form className={styles["auth-form"]} onSubmit={userSubmitHandler}>
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
          label="What is your preferred first name?"
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
        <Button type="submit" disabled={!formState.isValid}>
          REGISTER
        </Button>
      </form>
    </Fragment>
  );
};

export default LoginForm;
