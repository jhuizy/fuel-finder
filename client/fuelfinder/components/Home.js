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
import Toolbar from "./Toolbar";
import FilterDrawer from "./FilterDrawer";
import MOCK_DATA from "../mock/mockdata";

const PullHeight = 70;
const PullWidth = 50;

const Screen = {
  width: Dimensions.get("window").width,
  height: Dimensions.get("window").height
};

const FuelTypes = ["Unleaded", "Premium Unleaded", "Diesel", "AutoGas"];

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
      snapPoint: 0,
      filterItems: FuelTypes.map(item => ({ name: item, selected: false })),
      filterDrawerOpen: false
    };
    this._deltaY = new Animated.Value(Screen.height);
    this._filterDrawerDeltaX = new Animated.Value(Screen.width);
    this._refs = {};
  }

  render() {
    return (
      <View style={styles.container}>

        <Animated.View
          style={[
            styles.background,
            {
              backgroundColor: "white",
              opacity: this._deltaY.interpolate({
                inputRange: [0, Screen.height],
                outputRange: [0.5, 1]
              })
            }
          ]}
        >
          <View style={styles.toolbar}>
            <Toolbar
              title="Fuel Finder"
              onFilterPressed={this._onFilterPressed.bind(this)}
            />
          </View>
          <Map markers={this.state.markers} onRegionChange={region => {}} />
        </Animated.View>
        <Interactable.View
          ref={ref => this._refs["filterDrawer"] = ref}
          style={styles.filterDrawer}
          horizontalOnly={true}
          snapPoints={[
            { x: Screen.width - PullWidth },
            { x: Screen.width * 0.2 }
          ]}
          initialPosition={{ x: Screen.width - PullWidth }}
          animatedValue={this._filterDrawerDeltaX}
          onSnap={this._onFilterDrawerSnapped.bind(this)}
        >
          <View style={styles.filterDrawerContainer}>
            <View style={{ width: PullWidth }} />
            <FilterDrawer
              items={this.state.filterItems}
              onItemSelected={this._onItemSelected.bind(this)}
            />
          </View>

        </Interactable.View>
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
    switch (this._filterDrawerDeltaX._value) {
      case Math.ceil(Screen.height * 0.4):
        this._refs.handle.snapTo({ index: 2 });
        break;
      default:
        this._refs.handle.snapTo({ index: 1 });
        break;
    }
  }

  _onFilterPressed() {
    if (this.state.filterDrawerOpen) {
      this._refs.filterDrawer.snapTo({ index: 0 });
    } else {
      this._refs.filterDrawer.snapTo({ index: 1 });
    }

    this.setState({
      ...this.state,
      filterDrawerOpen: !this.state.filterDrawerOpen
    });
  }

  _onFilterDrawerSnapped(event) {
    this.setState({
      ...this.state,
      filterDrawerOpen: event.nativeEvent.index === 1
    });
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

  _onItemSelected(item) {
    this.setState({
      ...this.state,
      filterItems: this.state.filterItems.map(i => {
        if (i === item) {
          return { ...item, selected: !item.selected };
        } else {
          return i;
        }
      })
    });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column"
  },
  toolbar: {
    marginTop: 20,
    height: 50
  },
  background: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  },
  interactable: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: "absolute",
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
  },
  filterDrawer: {
    position: "absolute",
    left: 0,
    right: -Screen.width,
    top: 0,
    bottom: 0,
    marginTop: 20 + 50
  },
  filterDrawerContainer: {
    flex: 1,
    flexDirection: "row"
  }
});
