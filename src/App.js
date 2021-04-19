import Layout from "./components/Layout/Layout";

import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Checkout from "./containers/Checkout/Checkout";
import { BrowserRouter, Route } from "react-router-dom";
import Orders from "../src/containers/Orders/Orders";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Layout>
          <Route path="/checkout" component={Checkout} />
          <Route path="/orders" component={Orders} />
          <Route path="/" exact component={BurgerBuilder} />
        </Layout>
      </BrowserRouter>
    </div>
  );
}

export default App;
