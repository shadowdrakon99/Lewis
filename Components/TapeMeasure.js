import React, { Component } from 'react';
import { View, Text } from 'react-native'

export default class extends Component {
  render() {

    let cubeStyle = {height:50, width:50, borderWidth:0.4, borderColor:'#5edced', borderStyle:'dotted', zIndex:-1}
    let cubeArr = Array.apply(null, {length: 100}).map((v,k)=><View key={k} style={cubeStyle}/>)
    //TODO: probably shouldn't hardcode 100 boxes but calculate the number necessary to fill the screen instead...
    return(
      <View style={{position:'absolute', left:0, top:0, bottom:0, right:0, flexWrap:'wrap', backgroundColor:'#d7e0ed', overflow:'hidden'}}>
        {cubeArr}
      </View>
    )
  }
}
