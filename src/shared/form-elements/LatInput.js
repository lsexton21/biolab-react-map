import React, { useReducer, useEffect, useState, Fragment } from "react";

import { validate } from "./validators";

const inputReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE":
      return {
        ...state,
        value: action.val,
        isValid: validate(action.val, action.validators),
      };
    case "TOUCH": {
      return {
        ...state,
        isTouched: true,
      };
    }
    default:
      return state;
  }
};

const LatInput = (props) => {
  const [inputValue, setInputValue] = useState();
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.initialValue || "",
    isTouched: false,
    isValid: false || props.initialValid,
  });

  const { id, onInput } = props;
  const { value, isValid } = inputState;

  useEffect(() => {
    onInput(id, value, isValid);
  }, [id, value, isValid, onInput]);

  const changeHandler = (event) => {
    setInputValue(event.target.value);
    dispatch({
      type: "CHANGE",
      val: event.target.value,
      validators: props.validators,
    });
  };

  const touchHandler = () => {
    dispatch({
      type: "TOUCH",
    });
  };

  return (
    <Fragment>
      <input
        id="lat"
        element="input"
        label="Latitude"
        placeholder={32.733300574939676}
        onChange={latChangeHandler}
        onBlur={touchHandler}
        onInput={props.onInput}
        value={latValue}
      />

      {!inputState.isValid && inputState.isTouched && (
        <p>For San Diego, should be a number between 32 and 33</p>
      )}
    </Fragment>
  );
};
export default LatInput;
