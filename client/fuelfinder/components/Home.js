/* @flow */

import React, { Component } from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import Interactable from "react-native-interactable";
import Map from "./Map";
import List from "./List";
import MOCK_DATA from "../mock/mockdata";

const Screen = {
  width: Dimensions.get("window").width,
  height: Dimensions.get("window").height - 75
};

const performSearchMock = ({ latitude, longitude }) => {
  return new Promise.resolve(MOCK_DATA);
};

const performSearch = ({ latitude, longitude }) => {
  return fetch(
    "https://9mo6jgj3u3.execute-api.us-east-1.amazonaws.com/prod/fuel-service-dev-hello",
    {
      method: "POST",
      body: {
        longitude,
        latitude,
        limit: 10
      }
    }
  )
    .then(response => response.json())
    .catch(err => console.error(err));
};

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      markers: MOCK_DATA,
      region: {
        latitude: -31.9505,
        longitude: 115.8605,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0422
      },
      loading: false
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.background} />
        <Interactable.View
          verticalOnly={true}
          snapPoints={[{ y: 40 }, { y: Screen.height - 70 }]}
          boundaries={{ top: -300 }}
          initialPosition={{ y: Screen.height - 70 }}
        >
          <List style={styles.list} items={this.state.markers} />
        </Interactable.View>

      </View>
    );
  }

  onRegionChange(region) {
    this.setState({
      ...this.state,
      region,
      loading: true
    });

    performSearchMock(this.state.region).then(results => {
      console.log(JSON.stringify(results));

      this.setState({
        ...this.state,
        loading: false,
        markers: results
      });
    });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20
  },
  background: {
    backgroundColor: '#000000',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  },
  list: {}
});
