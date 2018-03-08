import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Icon } from 'native-base';

export default class extends Component {

  render() {

  let { style, children } = this.props

  let trashStyles = {
    height:50,
    width:50,
    justifyContent:'center',
    alignItems:'center',
  }

    return (
      <View style={[style, trashStyles]}>
        <View>
          {children}
        </View>
      </View>
    );
  }


}
