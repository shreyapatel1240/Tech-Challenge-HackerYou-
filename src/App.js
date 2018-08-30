import React, { Component } from "react";
import "./App.css";
import Header from "./components/header";
import Main from "./components/main";
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
      <div>
        <Header />
        <Main />
      </div>
    );
  }
}

export default App;
