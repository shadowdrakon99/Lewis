import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Icon } from 'native-base'; // 0.19.0

import "@expo/vector-icons"; // 6.3.1

export default class App extends Component {



  render() {
  let { style } = this.props

  let trashStyles = {
    marginRight:20,
    marginBottom:20,

  }

    return (
      <View style={[style, trashStyles]}>
        <View>
          <Icon name = 'trash' />
        </View>
      </View>
    );
  }


}
