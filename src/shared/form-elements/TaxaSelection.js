import { useState, useEffect, useReducer, Fragment } from "react";
import styles from "./TaxaSelection.module.css";
import "../form-elements/Input.css";

const TaxaSelection = (props) => {
  const [errorToggle, setErrorToggle] = useState(false);
  const [isTouched, setIsTouched] = useState(false);
  const initialTaxaValues = () => {
    if (props.initialValue) {
      let initialValues = {};
      props.initialValue.forEach((key) => (initialValues[key] = true));
      return initialValues;
    } else {
      return {
        Marine: false,
        Plants: false,
        Insects: false,
        Human: false,
        Other: false,
      };
    }
  };

  const [taxaValues, setTaxaValues] = useState(initialTaxaValues);

  const { id, onInput } = props;

  useEffect(() => {
    const activeTaxa = Object.keys(taxaValues).filter((key) => {
      return taxaValues[key] === true;
    });
    if (activeTaxa.length === 0) {
      onInput(id, activeTaxa, false);
      setErrorToggle(false);
    } else {
      onInput(id, activeTaxa, true);
      setErrorToggle(true);
    }
  }, [taxaValues, onInput]);

  const selectionHandler = (event) => {
    const { id, checked } = event.target;
    let updatedTaxa;
    updatedTaxa = { [id]: checked };
    setTaxaValues((taxaValues) => ({
      ...taxaValues,
      ...updatedTaxa,
    }));
    setIsTouched(true);
  };

  return (
    <fieldset style={{ marginBottom: "20px" }}>
      <legend
        style={{ fontWeight: "bold" }}
        className={!errorToggle && isTouched && styles.invalid}
      >
        {props.label}
      </legend>
      <div className={styles.taxaContainer}>
        <label
          className={`
          ${styles.label} ${
            taxaValues.Marine ? styles.active : styles.inactive
          }`}
          htmlFor="Marine"
        >
          Marine
        </label>
        <input
          className={styles.checkbox}
          name="taxa"
          id="Marine"
          type="checkbox"
          onChange={selectionHandler}
          value="Marine"
        />
        <label
          className={`
            ${styles.label} ${
            taxaValues.Plants ? styles.active : styles.inactive
          }`}
          htmlFor="Plants"
        >
          <span>Plants</span>
        </label>
        <input
          className={styles.checkbox}
          type="checkbox"
          name="taxa"
          id="Plants"
          onChange={selectionHandler}
          value="Plants"
        />
        <label
          className={`
          ${styles.label} ${
            taxaValues.Insects ? styles.active : styles.inactive
          }`}
          htmlFor="Insects"
        >
          <span>Insects</span>
        </label>
        <input
          className={styles.checkbox}
          type="checkbox"
          name="taxa"
          id="Insects"
          onChange={selectionHandler}
          value="Insects"
        />

        <label
          className={`
          ${styles.label} ${
            taxaValues.Humans ? styles.active : styles.inactive
          }`}
          htmlFor="Humans"
        >
          <span>Humans</span>
        </label>
        <input
          className={styles.checkbox}
          type="checkbox"
          name="taxa"
          id="Humans"
          onChange={selectionHandler}
          value="Humans"
        />
        <label
          className={`
          ${styles.label} ${
            taxaValues.Other ? styles.active : styles.inactive
          }`}
          htmlFor="Other"
        >
          <span>Other</span>
        </label>
        <input
          className={styles.checkbox}
          type="checkbox"
          name="taxa"
          id="Other"
          onChange={selectionHandler}
          value="Other"
        />
      </div>
      {!errorToggle && isTouched && (
        <div className={styles.errorText}>
          <p>{props.errorText}</p>
        </div>
      )}
    </fieldset>
  );
};

export default TaxaSelection;
