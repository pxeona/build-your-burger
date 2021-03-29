import React from "react";

import styles from "./Burger.module.css";
import BurgerIngredient from "./BurgerIngredients/BurgerIngredients";

const burger = (props) => {
  let ingredientItems = Object.keys(props.ingredients)
    .map((ingKey) =>
      [...Array(props.ingredients[ingKey])].map((_, k) => (
        <BurgerIngredient key={ingKey + k} type={ingKey} />
      ))
    )
    .reduce((arr, el) => {
      return arr.concat(el);
    }, []);

  if (ingredientItems.length === 0) {
    ingredientItems = <p>Please add ingredients</p>;
  }

  return (
    <div className={styles.Burger}>
      <BurgerIngredient type="bread-top" />
      {ingredientItems}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default burger;
