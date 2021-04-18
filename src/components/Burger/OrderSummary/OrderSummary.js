import React from "react";
import Aux from "../../../hoc/Auxiliary";
import Button from "../../UI/Button/Button";

const orderSummary = (props) => {
  const ingredientSummary = Object.keys(props.ingredients).map((ingKey) => (
    <li key={ingKey}>
      <span style={{ textTransform: "capitalize" }}>{ingKey} </span>:
      {props.ingredients[ingKey]}
    </li>
  ));
  return (
    <Aux>
      <h3>Order summary</h3>
      <p>Ingredients of your delicious burger are:</p>
      {ingredientSummary}
      <p>
        <strong>Total price: {props.price.toFixed(2)}</strong>
      </p>
      <Button btnType="Danger" clicked={props.purchaseCancelHandler}>
        CANCEL
      </Button>
      <Button btnType="Success" clicked={props.purchaseContinueHandler}>
        CONTINUE
      </Button>
    </Aux>
  );
};

export default orderSummary;
