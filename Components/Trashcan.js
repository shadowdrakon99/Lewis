import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Icon } from 'native-base'; // 0.19.0

import "@expo/vector-icons"; // 6.3.1

export default class App extends Component {



  render() {
  let { style } = this.props

    return (
      <View style={style}>
        <View>
          <Icon name = 'trash' />
        </View>
      </View>
    );
  }
}
