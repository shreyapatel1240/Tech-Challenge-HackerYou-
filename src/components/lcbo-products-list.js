import React, { Component } from "react";
import ProductsListItem from "./product-list-item";
import ProductDetails from "./product-details";
import Pagination from "react-js-pagination";
import callApi from "./services";

class LcboProductsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      pages: [],
      activePage: 1,
      selectedProduct: null
    };
    this.handlePagination = this.handlePagination.bind(this);
  }

  // get data from api and set state
  componentDidMount() {
    this.handlePagination();
  }

  handlePagination(pageNumber) {
    if (!pageNumber) pageNumber = 1;
    callApi(
      "get",
      "products",
      "q=beer&where_not=is_dead,is_discontinued",
      pageNumber
    )
      .then(response => {
        this.setState({
          products: response.data.result,
          pages: response.data.pager,
          activePage: pageNumber,
          selectedProduct: this.state.products[0]
        });
      })
      .catch(err => console.log(err));
  }

  // render products
  renderProducts() {
    if (!this.state.products) return;
    return this.state.products.map(product => {
      return (
        <ProductsListItem
          onProductSelect={selectedProduct =>
            this.setState({ selectedProduct })
          }
          key={product.id}
          product={product}
        />
      );
    });
  }
  render() {
    return (
      <div>
        <div className="row">{this.renderProducts()}</div>
        <div>
          <Pagination
            activePage={this.state.activePage}
            itemsCountPerPage={this.state.pages.records_per_page}
            totalItemsCount={this.state.pages.total_record_count}
            pageRangeDisplayed={5}
            onChange={this.handlePagination}
          />
        </div>
        <div>
          {/* Display product details on product click */}
          <ProductDetails product={this.state.selectedProduct} />
        </div>
      </div>
    );
  }
}

export default LcboProductsList;
