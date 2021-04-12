import React, { Component } from "react";

import Aux from "../../hoc/Auxiliary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Backdrop from "../../components/UI/Backdrop/Backdrop";
import axios from "../../axios-orders";

const INGREDIENT_PRICES = {
  salad: 0.5,
  meat: 1,
  bacon: 1,
  cheese: 0.8,
};

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      meat: 0,
      cheese: 0,
      salad: 0,
      bacon: 0,
    },
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
  };

  updatePurchasabaleStatus = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map((ingredient) => ingredients[ingredient])
      .reduce((sum, value) => sum + value, 0);
    this.setState({ purchasable: sum > 0 });
  };

  addIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const newCount = oldCount + 1;

    const updatedIngredients = { ...this.state.ingredients };
    updatedIngredients[type] = newCount;

    const newPrice = this.state.totalPrice + INGREDIENT_PRICES[type];

    this.setState({
      totalPrice: newPrice,
      ingredients: updatedIngredients,
    });

    this.updatePurchasabaleStatus(updatedIngredients);
  };

  removeIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const newCount = oldCount - 1;

    if (newCount < 0) {
      return;
    }

    const updatedIngredients = { ...this.state.ingredients };
    updatedIngredients[type] = newCount;

    const newPrice = this.state.totalPrice - INGREDIENT_PRICES[type];

    this.setState({
      totalPrice: newPrice,
      ingredients: updatedIngredients,
    });

    this.updatePurchasabaleStatus(updatedIngredients);
  };

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      customer: {
        name: "Pravin Xeona",
        address: "22 Becker St",
      },
      deliveryMethod: "fastest",
    };

    axios
      .post("/orders.json", order)
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  };

  render() {
    const disabledButtons = { ...this.state.ingredients };

    for (let k in disabledButtons) {
      disabledButtons[k] = disabledButtons[k] <= 0;
    }

    return (
      <Aux>
        <Backdrop
          show={this.state.purchasing}
          clicked={this.purchaseCancelHandler}
        />
        <Modal show={this.state.purchasing}>
          <OrderSummary
            ingredients={this.state.ingredients}
            purchaseCancelHandler={this.purchaseCancelHandler}
            purchaseContinueHandler={this.purchaseContinueHandler}
            price={this.state.totalPrice}
          />
        </Modal>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          addIngredient={this.addIngredientHandler}
          removeIngredient={this.removeIngredientHandler}
          disabledButtons={disabledButtons}
          price={this.state.totalPrice}
          purchasable={this.state.purchasable}
          purchaseHandler={this.purchaseHandler}
        />
      </Aux>
    );
  }
}

export default BurgerBuilder;
