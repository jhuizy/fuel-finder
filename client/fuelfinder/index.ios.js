/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from "react";
import { AppRegistry, StyleSheet, Text, View } from "react-native";
import Entry from './components/Entry';

export default class fuelfinder extends Component {
  render() {
    return (
      <Entry/> 
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

AppRegistry.registerComponent("fuelfinder", () => fuelfinder);
