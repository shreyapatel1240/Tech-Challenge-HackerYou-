import React, { Component } from "react";
import callApi from "./services";
import Pagination from "react-js-pagination";
import ProductsListItem from "./product-list-item";

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
      pageNumber,
      10
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
      return <ProductsListItem key={product.id} product={product} />;
    });
  }

  render() {
    return (
      <div>
        <div className="product-list">{this.renderProducts()}</div>
        {/* Pagination */}
        <Pagination
          activePage={this.state.activePage}
          itemsCountPerPage={this.state.pages.records_per_page}
          totalItemsCount={this.state.pages.total_record_count}
          pageRangeDisplayed={5}
          onChange={this.handlePagination}
        />
      </div>
    );
  }
}

export default ProductsList;
