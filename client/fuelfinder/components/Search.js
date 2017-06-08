import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableHighlight,
  StyleSheet
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ""
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{ flex: 0.9 }}>
          <TextInput
            style={{ height: 40 }}
            value={this.state.text}
            editable={true}
            onChangeText={this._onChangeText.bind(this)}
            placeholder="Search for a location (eg. Perth)"
          />
        </View>
        <View style={{ flex: 0.1 }}>
          <TouchableHighlight onPress={this._onClearTextPressed.bind(this)}>
            <Icon name="close" size={25} />
          </TouchableHighlight>
        </View>
      </View>
    );
  }

  _onClearTextPressed() {
    this.setState({ text: "" });
  }

  _onChangeText(text) {
    this.setState({ text });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: 10
  }
});

export default Search;
