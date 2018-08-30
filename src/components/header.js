import React from "react";
import { Link } from "react-router-dom";
import logo from "../images/beer.png";

const Header = () => {
  return (
    <nav>
      <Link to="/">
        <img src={logo} className="App-logo" alt="logo" />
      </Link>
      <ul>
        <li>
          <Link to="/seasonal">Seasonal Beverage</Link>
        </li>
        <li>
          <Link to="/beers">Beer</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Header;
