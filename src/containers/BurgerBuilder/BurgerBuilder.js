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
import { connect } from "react-redux";
import * as actionTypes from "../../store/actions";

class BurgerBuilder extends Component {
  state = {
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
    return sum > 0;
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

    // const queryParams = [];
    // for (let i in this.state.ingredients) {
    //   queryParams.push(
    //     encodeURIComponent(i) +
    //       "=" +
    //       encodeURIComponent(this.state.ingredients[i])
    //   );
    // }
    // queryParams.push("price=" + this.state.totalPrice);

    // const queryString = queryParams.join("&");

    //   this.props.history.push({
    //     pathname: "/checkout",
    //     search: "?" + queryString,
    //   });
    this.props.history.push("/checkout");
  };

  render() {
    const disabledButtons = { ...this.props.ings };

    for (let k in disabledButtons) {
      disabledButtons[k] = disabledButtons[k] <= 0;
    }

    let burger = this.state.error ? (
      <p>Ingredients can't be loaded</p>
    ) : (
      <Spinner />
    );

    let orderSummary = null;

    if (this.props.ings) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ings} />
          <BuildControls
            addIngredient={this.props.onIngredientAdded}
            removeIngredient={this.props.onIngredientRemoved}
            disabledButtons={disabledButtons}
            price={this.props.totalPrice}
            purchasable={this.updatePurchasabaleStatus(this.props.ings)}
            purchaseHandler={this.purchaseHandler}
          />
        </Aux>
      );

      orderSummary = (
        <OrderSummary
          ingredients={this.props.ings}
          purchaseCancelHandler={this.purchaseCancelHandler}
          purchaseContinueHandler={this.purchaseContinueHandler}
          price={this.props.totalPrice}
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

const mapStateToProps = (state) => {
  return {
    ings: state.ingredients,
    totalPrice: state.totalPrice,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onIngredientAdded: (ingName) =>
      dispatch({ type: actionTypes.ADD_INGREDIENT, ingredientName: ingName }),
    onIngredientRemoved: (ingName) =>
      dispatch({
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: ingName,
      }),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
