import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableHighlight } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

class Toolbar extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View>
          <TouchableHighlight onPress={() => {}}>
            <Icon name="menu" size={30} />
          </TouchableHighlight>
        </View>
        <View>
          <Text style={styles.titleText}>{this.props.title}</Text>
        </View>
        <View>
          <TouchableHighlight onPress={() => this.props.onFilterPressed()}>
            <Icon name="filter-list" size={30} />
          </TouchableHighlight>
        </View>
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
    backgroundColor: "white",
    padding: 10
  },
  titleText: {
    fontSize: 16,
    fontWeight: "bold"
  },
  rightIcon: {
    padding: 10
  }
});

export default Toolbar;
