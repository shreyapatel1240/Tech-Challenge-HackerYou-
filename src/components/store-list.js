import React, { Component } from "react";
import Pagination from "react-js-pagination";
import callApi from "./services";

class StoreList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stores: [],
      pages: [],
      activePage: 1,
      product_id: this.props.product.id
    };
    this.handlePagination = this.handlePagination.bind(this);
  }

  handlePagination(pageNumber) {
    if (!pageNumber) pageNumber = 1;

    callApi("get", "stores", `product_id=${this.state.product_id}`, pageNumber)
      .then(response => {
        this.setState({
          stores: response.data.result,
          pages: response.data.pager,
          activePage: pageNumber
        });
      })
      .catch(err => console.log(err));
  }

  componentDidMount() {
    this.handlePagination();
  }

  renderStores() {
    if (!this.state.stores) return;
    return this.state.stores.map(store => {
      return <div key={store.id}>{store.name}</div>;
    });
  }

  render() {
    return (
      <div>
        <div className="row">{this.renderStores()}</div>
        <div>
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

export default StoreList;
