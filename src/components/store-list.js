import React, { Component } from "react";
import Pagination from "react-js-pagination";
import callApi from "./services";
import StoreListItem from "./store-list-items";
import Map from "./map";

class StoreList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stores: [],
      pages: [],
      activePage: 1,
      product_id: this.props.product.id,
      selectedStore: null
    };
    this.handlePagination = this.handlePagination.bind(this);
  }

  handlePagination(pageNumber) {
    if (!this.state.product_id) return;
    if (!pageNumber) pageNumber = 1;

    callApi(
      "get",
      "stores",
      `product_id=${this.state.product_id}`,
      pageNumber,
      7
    )
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
      return (
        <StoreListItem
          key={store.id}
          onStoreSelect={selectedStore => this.setState({ selectedStore })}
          store={store}
        />
      );
    });
  }

  renderMap() {
    if (!this.state.selectedStore) return;
    return (
      <Map key={this.state.selectedStore.id} store={this.state.selectedStore} />
    );
  }

  render() {
    return (
      <div>
        <div className="store-map">
          <div className="left-section">
            <h3>In-Store</h3>
            {this.renderStores()}
            <Pagination
              activePage={this.state.activePage}
              itemsCountPerPage={this.state.pages.records_per_page}
              totalItemsCount={this.state.pages.total_record_count}
              pageRangeDisplayed={5}
              onChange={this.handlePagination}
            />
          </div>
          <div className="right-section">
            <h3>Select a store from the left panel to get direction.</h3>
            {this.renderMap()}
          </div>
        </div>
      </div>
    );
  }
}

export default StoreList;
