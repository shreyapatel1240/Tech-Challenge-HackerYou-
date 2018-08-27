import React, { Component } from "react";
import "./App.css";
import ProductsList from "./components/products-list";
import LcboProductsList from "./components/lcbo-products-list";

class App extends Component {
  render() {
    return (
      <div className="App">
        {/* List of Seasonal Beverages */}
        <h1 className="App-title">Seasonal Beverages</h1>
        <ProductsList />
        {/* List of LCBO beers */}
        <h2 className="App-title">Beer that are available through the LCBO</h2>
        <LcboProductsList />
      </div>
    );
  }
}

export default App;
