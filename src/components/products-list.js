import React, { Component } from "react";
import callApi from "./services";
import Pagination from "react-js-pagination";
import noImage from "../images/No_image.png";
//import ProductsListItem from "./product-list-item";

class ProductsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      pages: [],
      activePage: 1
    };
    this.handlePagination = this.handlePagination.bind(this);
  }

  componentDidMount() {
    this.handlePagination();
  }

  handlePagination(pageNumber) {
    if (!pageNumber) pageNumber = 1;
    callApi(
      "get",
      "products",
      "where=is_seasonal&where_not=is_dead,is_discontinued",
      pageNumber
    )
      .then(response => {
        this.setState({
          products: response.data.result,
          pages: response.data.pager,
          activePage: pageNumber
        });
      })
      .catch(err => console.log(err));
  }

  // render the products
  renderProducts() {
    if (!this.state.products) return;

    return this.state.products.map(product => {
      //return <ProductsListItem key={product.id} product={product} />;
      let img_src;
      if (product.image_thumb_url) {
        img_src = product.image_thumb_url;
      } else {
        img_src = noImage;
      }
      return (
        <div key={product.id} className="column">
          <img src={img_src} alt={product.name} />
          {product.name}
          <br />
          {product.package}
        </div>
      );
    });
  }

  render() {
    return (
      <div>
        <div className="row">{this.renderProducts()}</div>
        <div>
          {/* Pagination */}
          <Pagination
            activePage={this.state.activePage}
            itemsCountPerPage={this.state.pages.records_per_page}
            totalItemsCount={this.state.pages.total_record_count}
            pageRangeDisplayed={5}
            onChange={this.handlePagination}
          />
        </div>
      </div>
    );
  }
}

export default ProductsList;
