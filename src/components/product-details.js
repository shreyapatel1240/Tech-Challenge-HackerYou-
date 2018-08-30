import React, { Component } from "react";
import callApi from "./services";
import StoreList from "./store-list";
import noImage from "../images/No_image.png";
import "../Store.css";

class ProductDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: []
    };
  }
  componentDidMount() {
    callApi("get", `products/${this.props.match.params.id}`)
      .then(response => {
        this.setState({
          product: response.data.result
        });
      })
      .catch(err => console.log(err));
  }

  renderStores() {
    if (!this.state.product) return;
    return (
      <StoreList product={this.state.product} key={this.state.product.id} />
    );
  }

  render() {
    if (!this.state.product) return;
    // check for tasting notes and serving suggestions
    let tastingNote;
    let servingSuggestion;
    let img_src;
    if (this.state.product.image_thumb_url) {
      img_src = this.state.product.image_thumb_url;
    } else {
      img_src = noImage;
    }
    if (this.state.product.tasting_note != null) {
      tastingNote = (
        <div>
          <h3>Tasting Note</h3>
          {this.state.product.tasting_note}
        </div>
      );
    }
    if (this.state.product.serving_suggestion != null) {
      servingSuggestion = (
        <div>
          <h3>Serving Suggestion</h3>
          {this.state.product.serving_suggestion}
        </div>
      );
    }

    return (
      <div>
        <div className="section">
          <div className="left-section">
            <img src={img_src} alt={this.state.product.name} />
          </div>
          <div className="right-section">
            <h1>{this.state.product.name}</h1>
            <p>{this.state.product.description} </p>
            <p>
              <b>Produced By:</b> {this.state.product.producer_name} |{" "}
              {this.state.product.package}
            </p>
            <p>
              Price:{" "}
              <span className="price">
                ${this.state.product.price_in_cents / 100}
              </span>
            </p>
            {/* display tasting note - serving suggetion */}
            {tastingNote}
            <br />
            {servingSuggestion}
          </div>
        </div>
        <div className="bottom-section">
          {/* Display all the stores list */}
          {this.renderStores()}
        </div>
      </div>
    );
  }
}

export default ProductDetails;
