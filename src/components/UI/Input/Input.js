import React from "react";

import styles from "./Input.module.css";

const Input = (props) => {
  let inputElement = null;

  switch (props.inputtype) {
    case "input":
      inputElement = <input className={styles.InputElement} {...props} />;

    case "teaxtarea":
      inputElement = <textarea className={styles.InputElement} {...props} />;

    default:
      inputElement = <input className={styles.InputElement} {...props} />;
  }

  return (
    <div className={styles.Input}>
      <label className={styles.Label}>{props.label}</label>
      {inputElement}
    </div>
  );
};

export default Input;
