import Layout from "./components/Layout/Layout";

import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Checkout from "./containers/Checkout/Checkout";
import { BrowserRouter, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
import reducer from "../src/store/reducer";

import Orders from "../src/containers/Orders/Orders";

function App() {
  const store = createStore(reducer);

  return (
    <div>
      <Provider store={store}>
        <BrowserRouter>
          <Layout>
            <Route path="/checkout" component={Checkout} />
            <Route path="/orders" component={Orders} />
            <Route path="/" exact component={BurgerBuilder} />
          </Layout>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
