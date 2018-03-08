import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import PropTypes from 'prop-types'

export default class Lewis extends Component {

  constructor(props) {
    super(props)
    const { vale, bonds } = props

    this.state = {
      dots:this.valeToDots(vale,bonds),
      vale:vale
    }
  }

  static defaultProps = {
    side:50,
    vale:1,
    symbol:"H",
    bonds:[0,0,0,0]
  }

  static propTypes = {
    side:PropTypes.number, // side length. should default to 50... if it doesn't this is a bug with Expo so just pass in 50 for this prop
    vale:PropTypes.number, // number of valence electrons. if this is set, it'll ignore left,right,top,bottom
    symbol:PropTypes.string, // Element symbol. Like Na, Mg, B, C, N, O, F, Ne ... defaults to H
    bonds:PropTypes.arrayOf(PropTypes.number), // number of bonds on [ top, right, bottom, left ] sides
    style:PropTypes.oneOfType([PropTypes.array, PropTypes.object]), // style of container
    onPressDomain:PropTypes.func.isRequired,
  }

  updateDots(newBonds) {
    const { vale } = this.state
    this.setState({ dots: this.valeToDots(vale, newBonds) })
  }

  valeToDots(vale, bonds) { //BUG: for some reason the array indicies with bonds still get assigned values > 0...
      let dots = [0,0,0,0]
      const sumBonds = bonds.reduce((a,b)=>a+b, 0)
      const numLone = vale - sumBonds
      let skip = 0
      for(let i=0; i<numLone; i++) {
        if(bonds[(i+skip) % 4]) {skip = skip + 1; i--}
        if(!bonds.includes(0)) break;
        if(dots[(i+skip) % 4]<2) dots[(i+skip) % 4] = dots[(i+skip) % 4] + 1
      }
      // TODO: need some basic bond predicting logic...after bond, lone pair electrons are always paired even when shell isn't full?
      return dots
  }

  componentWillReceiveProps(newProps) {
    this.updateDots(newProps.bonds)
  }

  render() {
    const { side, style, symbol, bonds, onPressDomain } = this.props
    const { dots } = this.state
    const masterContainerStyle = { height:side, width:side, }
    const rowStyle = { flex:1, flexDirection:'row' }
    const eleContainerStyle = { flex:2, flexDirection:'row', }
    const elementStyle = { flex:2, justifyContent:'space-around', alignItems:'center', flexDirection:'row', }
    const textStyle = { fontSize:side*.3 }


    return(
       <View style={[style, masterContainerStyle]}>
          <View style={rowStyle}>
            <View style={rowStyle}></View>
              <Dots ins={bonds[0] || dots[0]} bonded={bonds[0]} onPress={()=>onPressDomain(0)}/>
            <View style={rowStyle}></View>
          </View>
          <View style={eleContainerStyle}>
            <View style={rowStyle}>
              <Dots vertical ins={bonds[3] || dots[3]} bonded={bonds[3]} onPress={()=>onPressDomain(3)} />
            </View>
            <View style={elementStyle}>
              <Text style={textStyle}>{symbol}</Text>
            </View>
            <View style={rowStyle}>
              <Dots vertical ins={bonds[1] || dots[1]} bonded={bonds[1]} onPress={()=>onPressDomain(1)} />
            </View>
          </View>
          <View style={rowStyle}>
            <View style={rowStyle}></View>
              <Dots ins={bonds[2] || dots[2]} bonded={bonds[2]} onPress={()=>onPressDomain(2)} />
            <View style={rowStyle}></View>
          </View>
       </View>
    )
  }
}

class Dots extends Component {

  static propTypes = {
    vertical: PropTypes.bool,
    ins: PropTypes.number,
    bonded: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
    style:PropTypes.oneOfType([PropTypes.array, PropTypes.object])
  }

  static defaultProps = {
    vertical: false,
    bonded: false,
    ins: 0,
  }

  renderDots(num, bonded) {
    let dots = []
    for(let i = 0; i<num; i++ ) {
      dots = [...dots, (bonded?<Text key={i}>&#9475;</Text>:<Text key={i}>&#8226;</Text>)]
    }
    return dots
  } // IDEA: if I can take out the padding in the side of the Text, &#9475; would be perfect to replace "|" b/c much higher

  render() {

    const { vertical, ins, style, bonded, onPress } = this.props
    const containerStyle = { flex:2, justifyContent:'center', alignItems:'center', }
    const dotStyle = {
      justifyContent:'space-around',
      alignItems:'center',
      flexDirection:'row',
      transform: vertical?[{ rotate: '90deg'}]:[],
    }

    return (
        <View style={[style, containerStyle]}>
          <TouchableWithoutFeedback onPress={onPress} style={{ flex:1 }} >
            <View style={dotStyle} >
               {this.renderDots(ins,bonded)}
            </View>
          </TouchableWithoutFeedback>
        </View>
    )
  }
}
