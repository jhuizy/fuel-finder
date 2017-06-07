import React, { Component } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import CheckBox from "react-native-check-box";

const FilterItem = props => {
  let { name, selected, onSelectionChanged } = props;

  return (
    <View style={styles.filterItem}>
      <CheckBox
        style={{ flex: 1, padding: 10 }}
        rightText={name}
        isChecked={selected}
        onClick={() => onSelectionChanged()}
      />
    </View>
  );
};

class FilterDrawer extends Component {
  render() {
    return (
      <FlatList
        style={styles.filterList}
        data={this.props.items}
        renderItem={this._renderItem.bind(this)}
        keyExtractor={(item, index) => item.name}
      />
    );
  }

  _renderItem({ item, index }) {
    return (
      <FilterItem
        name={item.name}
        selected={item.selected}
        onSelectionChanged={() => this.props.onItemSelected(item)}
      />
    );
  }
}

const styles = StyleSheet.create({
  filterList: {
      flex: 1,
      backgroundColor: '#efefef'
  },
  filterItem: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    height: 50,
    marginLeft: 10
  },
  filterItemPart: {
    marginLeft: 10,
    marginRight: 10
  }
});

export default FilterDrawer;
