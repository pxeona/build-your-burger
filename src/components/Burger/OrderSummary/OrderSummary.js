import React from "react";
import Aux from "../../../hoc/Auxiliary";

const orderSummary = (props) => {
  const ingredientSummary = Object.keys(props.ingredients).map((ingKey) => (
    <li>
      <span style={{ textTransform: "capitalize" }}>{ingKey} </span>:
      {props.ingredients[ingKey]}
    </li>
  ));
  return (
    <Aux>
      <h3>Order summary</h3>
      <p>Ingredients of your delicious burger are:</p>
      {ingredientSummary}
    </Aux>
  );
};

export default orderSummary;
