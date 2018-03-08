import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Icon } from 'native-base'; 

export default class App extends Component {

  render() {

  let { style } = this.props

  let trashStyles = {
    height:50,
    width:50,
    justifyContent:'center',
    alignItems:'center',
    position:'absolute',
    bottom:0,
    right:0,

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
