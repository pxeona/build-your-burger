import React from "react";
import Aux from "../../../hoc/Auxiliary";
import Button from "../../UI/Button/Button";

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
