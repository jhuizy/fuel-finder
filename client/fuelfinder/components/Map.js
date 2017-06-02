/* @flow */

import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";

export default class Map extends Component {
  render() {

    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          onRegionChange={(region) => this.props.onRegionChange(region)}
          region={this.props.region}
        >
          {this.props.markers.map(marker => <Marker coordinate={marker.coordinate} />)}

        </MapView>
      </View>
    );
  }

  onRegionChange(region) {
    this.props.onRegionChange(region);
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  map: {
    ...StyleSheet.absoluteFillObject
  }
});
