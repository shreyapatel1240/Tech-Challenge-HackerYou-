import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./home";
import ProductsList from "./products-list";
import LcboProductsList from "./lcbo-products-list";
import ProductDetails from "./product-details";
import "../Product.css";

const Main = () => {
  return (
    <main>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/seasonal" component={ProductsList} />
        <Route exact path="/beers" component={LcboProductsList} />
        <Route path="/beer/:id" component={ProductDetails} />
      </Switch>
    </main>
  );
};

export default Main;
