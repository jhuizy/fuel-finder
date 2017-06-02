import React, { Component } from "react";
import { StyleSheet, FlatList, View, Text } from "react-native";

class List extends Component {
  render() {
    return (
      <FlatList
        style={styles.container}
        data={this.props.items}
        renderItem={this._renderItem.bind(this)}
        keyExtractor={this._keyExtractor.bind(this)}
      />
    );
  }

  _keyExtractor(item, index) {
    return item.name;
  }

  _renderItem({ item, index }) {
    return (
      <View style={styles.row}>
        <View><Text style={styles.priceText}>{item.price}</Text></View>
        <View style={styles.details}>
          <View><Text style={styles.brandText}>{item.brand}</Text></View>
          <View><Text style={styles.descriptionText}>{item.name}</Text></View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#efefef"
  },
  row: {
    flex: 1,
    backgroundColor: "#efefef",
    height: 70,
    padding: 10,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  details: {
    flex: 1,
    marginLeft: 10,
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "flex-start"
  },
  priceText: {
    fontSize: 24,
    fontWeight: "bold"
  },
  brandText: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  descriptionText: {
    fontSize: 14
  }
});

export default List;
