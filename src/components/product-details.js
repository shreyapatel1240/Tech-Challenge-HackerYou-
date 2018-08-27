import React, { Component } from "react";
import StoreList from "./store-list";

class ProductDetails extends Component {
  render() {
    if (!this.props.product) return <div />;
    return (
      <div className="productDetail">
        <h2>{this.props.product.name}</h2>
        <p>{this.props.product.package}</p>
        <p>{this.props.product.description}</p>
        <h4>Stores that contains {this.props.product.name}</h4>
        {/* Display all the stores list */}
        <StoreList product={this.props.product} key={this.props.product.id} />
      </div>
    );
  }
}

export default ProductDetails;
