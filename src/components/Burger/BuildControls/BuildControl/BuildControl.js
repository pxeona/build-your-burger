import React from "react";

import styles from "./BuildControl.module.css";

const buildControl = (props) => {
  return (
    <div className={styles.BuildControl}>
      <div className={styles.Label}>{props.label}</div>
      <button className={styles.Add} onClick={props.addEvent}>
        Add
      </button>
      <button className={styles.Remove} onClick={props.removeEvent}>
        Remove
      </button>
    </div>
  );
};

export default buildControl;
