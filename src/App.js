import React, { Component } from "react";
import "./App.css";
import ProductsList from "./components/products-list";
import LcboProductsList from "./components/lcbo-products-list";
import variables from "./variables.json";

class App extends Component {
  componentDidMount() {
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = `https://maps.googleapis.com/maps/api/js?key=${
      variables.MAP_KEY
    }&libraries=places`;
    document.body.appendChild(script);
  }
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
