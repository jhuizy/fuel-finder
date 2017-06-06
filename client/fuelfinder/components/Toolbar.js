import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";

class Toolbar extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View></View>
        <View>
            <Text style={styles.titleText}>{this.props.title}</Text>
        </View>
        <View></View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    height: 50,
    alignItems: "center",
    backgroundColor: 'white'
  },
  titleText: {
      fontSize: 16,
      fontWeight: 'bold'
  }
});

export default Toolbar;
