import React from "react";

import styles from "./BurgerIngredients.module.css";

const burgerIngredient = (props) => {
  let ingredient = null;

  switch (props.type) {
    case "bread-bottom":
      ingredient = <div className={styles.BreadBottom}></div>;
    case "bread-top":
      ingredient = (
        <div className={styles.BreadTop}>
          <div className={styles.Seeds1}></div>
          <div className={styles.Seeds2}></div>
        </div>
      );
    case "meat":
      ingredient = <div className={styles.Meat}></div>;
    case "cheese":
      ingredient = <div className={styles.Cheese}></div>;
    case "salad":
      ingredient = <div className={styles.Salad}></div>;
    case "bacon":
      ingredient = <div className={styles.Bacon}></div>;
    default:
      ingredient = null;

      return ingredient;
  }
};

export default burgerIngredient;
