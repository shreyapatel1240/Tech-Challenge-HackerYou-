import React, { Component } from "react";

export default class Map extends Component {
  componentDidMount() {
    this.displayMap();
  }

  displayMap() {
    var directionsService = new window.google.maps.DirectionsService();
    var directionsDisplay = new window.google.maps.DirectionsRenderer();
    var latlng = new window.google.maps.LatLng(43.6565353, -79.6010376);
    let map = new window.google.maps.Map(document.getElementById("map"), {
      center: latlng,
      zoom: 13,
      mapTypeId: "roadmap"
    });
    directionsDisplay.setMap(map);

    document
      .getElementById("stores_" + this.props.store.id)
      .addEventListener(
        "click",
        this.calculateAndDisplayRoute(
          directionsService,
          directionsDisplay,
          this.props.store.latitude,
          this.props.store.longitude
        )
      );
  }

  calculateAndDisplayRoute(
    directionsService,
    directionsDisplay,
    latitude,
    longitude
  ) {
    // check if geolocation is supported/enabled on current browser
    navigator.geolocation.getCurrentPosition(
      function success(position) {
        directionsService.route(
          {
            origin: `${position.coords.latitude}, ${position.coords.longitude}`,
            destination: `${latitude}, ${longitude}`,
            travelMode: "DRIVING"
          },
          function(response, status) {
            if (status === "OK") {
              directionsDisplay.setDirections(response);
            } else {
              window.alert(`Directions request failed due to ${status}`);
            }
          }
        );
      },
      function error(error_message) {
        // for when getting location results in an error
        console.error(
          "An error has occured while retrievingnnlocation",
          error_message
        );
      }
    );
  }

  render() {
    const mapStyle = {
      minHeight: "280px",
      width: "90%"
    };

    return <div id="map" style={mapStyle} />;
  }
}
