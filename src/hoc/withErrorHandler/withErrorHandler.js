import React, { Component } from "react";

import Aux from "../Auxiliary";
import Modal from "../../components/UI/Modal/Modal";
import Backdrop from "../../components/UI/Backdrop/Backdrop";

const withErrorHandler = (WrapperComponent, axios) => {
  return class extends Component {
    state = {
      error: null,
    };

    errorConfirmedHandler = () => {
      this.setState({ error: null });
    };

    componentWillMount() {
      axios.interceptors.request.use((req) => {
        this.setState({ error: null });
        return req;
      });

      axios.interceptors.response.use(
        (res) => res,
        (error) => {
          this.setState({ error: error });
          console.log(this.state.error);
        }
      );
    }

    render() {
      return (
        <Aux>
          <Backdrop
            show={this.state.error}
            clicked={this.errorConfirmedHandler}
          />
          <Modal show={this.state.error}>
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrapperComponent {...this.props} />
        </Aux>
      );
    }
  };
};

export default withErrorHandler;
