import React, { Component } from "react";

import Aux from "../../hoc/Auxiliary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Backdrop from "../../components/UI/Backdrop/Backdrop";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

const INGREDIENT_PRICES = {
  salad: 0.5,
  meat: 1,
  bacon: 1,
  cheese: 0.8,
};

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    loading: false,
    error: false,
  };

  componentDidMount() {
    axios
      .get("/ingredients.json")
      .then((response) => this.setState({ ingredients: response.data }))
      .catch((error) => this.setState({ error: true }));
  }

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
    // this.setState({ loading: true });

    // const order = {
    //   ingredients: this.state.ingredients,
    //   price: this.state.totalPrice,
    //   customer: {
    //     name: "Pravin Xeona",
    //     address: "22 Becker St",
    //   },
    //   deliveryMethod: "fastest",
    // };

    // axios
    //   .post("/orders.json", order)
    //   .then((response) => this.setState({ loading: false, purchasing: false }))
    //   .catch((error) => this.setState({ loading: false, purchasing: false }));

    const queryParams = [];
    for (let i in this.state.ingredients) {
      queryParams.push(
        encodeURIComponent(i) +
          "=" +
          encodeURIComponent(this.state.ingredients[i])
      );
    }
    const queryString = queryParams.join("&");

    this.props.history.push({
      pathname: "/checkout",
      search: "?" + queryString,
    });
  };

  render() {
    const disabledButtons = { ...this.state.ingredients };

    for (let k in disabledButtons) {
      disabledButtons[k] = disabledButtons[k] <= 0;
    }

    let burger = this.state.error ? (
      <p>Ingredients can't be loaded</p>
    ) : (
      <Spinner />
    );

    let orderSummary = null;

    if (this.state.ingredients) {
      burger = (
        <Aux>
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

      orderSummary = (
        <OrderSummary
          ingredients={this.state.ingredients}
          purchaseCancelHandler={this.purchaseCancelHandler}
          purchaseContinueHandler={this.purchaseContinueHandler}
          price={this.state.totalPrice}
        />
      );

      if (this.state.loading) {
        orderSummary = <Spinner />;
      }
    }

    return (
      <Aux>
        <Backdrop
          show={this.state.purchasing}
          clicked={this.purchaseCancelHandler}
        />
        <Modal show={this.state.purchasing}>{orderSummary}</Modal>
        {burger}
      </Aux>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios);
