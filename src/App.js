import React, { Component } from "react";
import "./App.css";
import Navigation from "./components/navigation";
import MainContainer from "./components/main-container";
import variables from "./variables.json";
import "./Pagination.css";

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
      <div>
        <Navigation />
        <MainContainer />
      </div>
    );
  }
}

export default App;
