/* @flow */

import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Animated,
  TouchableHighlight
} from "react-native";
import Interactable from "react-native-interactable";
import Map from "./Map";
import List from "./List";
import MOCK_DATA from "../mock/mockdata";

const PullHeight = 70;

const Screen = {
  width: Dimensions.get("window").width,
  height: Dimensions.get("window").height
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
      loading: false,
      snapPoint: 0
    };
    this._deltaY = new Animated.Value(Screen.height);
    this._refs = {};
  }

  render() {
    return (
      <View style={styles.container}>
        <Animated.View
          style={[
            styles.background,
            {
              backgroundColor: "black",
              opacity: this._deltaY.interpolate({
                inputRange: [0, Screen.height],
                outputRange: [0.5, 1]
              })
            }
          ]}
        >
          <Map markers={this.state.markers} onRegionChange={region => {}} />
        </Animated.View>
        <Interactable.View
          ref={ref => this._refs["handle"] = ref}
          style={styles.interactable}
          verticalOnly={true}
          snapPoints={[
            { y: 0 },
            { y: Screen.height * 0.4 },
            { y: Screen.height - PullHeight }
          ]}
          initialPosition={{ y: Screen.height - PullHeight }}
          animatedValueY={this._deltaY}
        >
          <TouchableHighlight onPress={this._onHandleTap.bind(this)}>
            <View style={styles.listHandle}>
              <Text>{this.state.markers.length} result(s)</Text>
            </View>
          </TouchableHighlight>

          <List style={styles.list} items={this.state.markers} />
        </Interactable.View>

      </View>
    );
  }

  _onHandleTap() {
    switch (this._deltaY._value) {
      case Math.ceil(Screen.height * 0.4):
        this._refs.handle.snapTo({ index: 2 });
        break;
      default:
        this._refs.handle.snapTo({ index: 1 });
        break;
    }
  }

  _onRegionChange(region) {
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
    flex: 1
  },
  background: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  },
  interactable: {
    flex: 1,
    flexDirection: "column"
  },
  listHandle: {
    justifyContent: "center",
    alignItems: "center",
    height: PullHeight,
    backgroundColor: "#efefef",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 5,
    shadowOpacity: 0.4
  },
  list: {
    flex: 1,
    height: Screen.height
  }
});
