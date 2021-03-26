import React from "react";

import styles from "./Burger.module.css";
import BurgerIngredient from "./BurgerIngredients/BurgerIngredients";

const burger = (props) => {
  const ingredientItems = Object.keys(props.ingredients).map((ingKey) =>
    [...Array(props.ingredients[ingKey])].map((_, k) => (
      <BurgerIngredient key={ingKey + k} type={ingKey} />
    ))
  );
  return (
    <div className={styles.Burger}>
      <BurgerIngredient type="bread-top" />
      {ingredientItems}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default burger;
