import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import PropTypes from 'prop-types'

export default class Lewis extends Component {

  constructor(props) {
    super(props)

    const { vale, left, right, top, bottom } = props

    this.state={
      dots:[0,0,0,0], //top right bottom left
      bonds:[top, right, bottom, left],
      vale:vale
    }
  }

  static defaultProps = {
    side:50,
    vale:1,
    symbol:"H",
    left:0,
    right:0,
    top:0,
    bottom:0,
  }

  static propTypes = {
    side:PropTypes.number, // side length. should default to 50... if it doesn't this is a bug with Expo so just pass in 50 for this prop
    vale:PropTypes.number, // number of valence electrons. if this is set, it'll ignore left,right,top,bottom
    symbol:PropTypes.string, // Element symbol. Like Na, Mg, B, C, N, O, F, Ne ... defaults to H
    left:PropTypes.number, // number of bonds left side
    right:PropTypes.number, // number of bonds right side
    top:PropTypes.number, // number of bonds top side
    bottom:PropTypes.number, // number of bonds bottom side
    style:PropTypes.oneOfType([PropTypes.array, PropTypes.object]) // style of container
  }

  componentDidMount() {
    this.updateDots()
  }

  updateDots() {
    const { vale, bonds:[top, right, bottom, left] } = this.state
    this.setState({
      bonds:[top, right, bottom, left],
      dots: this.valeToDots(vale, [top, right, bottom, left])
    })
  }

  valeToDots(vale, bonds) {
      let dots = this.state.dots.slice()
      const sumBonds = bonds.reduce((a,b)=>a+b, 0)
      const numLone = vale - sumBonds
      let skip = 0
      for(let i=0; i<numLone; i++) {
        if(bonds[(i+skip) % 4]){skip = skip + 1; i--}
        dots[(i+skip) % 4] = dots[(i+skip) % 4] + 1
      }
      return dots
  }

  onPressDots(index) {
    let newState = this.state.bonds.slice()
    newState[index] = (newState[index]<3) ? newState[index]+1 : 0
    this.setState({bonds:newState})
    //BUG: can't do a updateDots call here... to update dots. Looks like state doesn't update fast enough?
  }

  render() {
    const { side, style, symbol, } = this.props
    const { dots, bonds } = this.state
    const masterContainerStyle = { height:side, width:side, }
    const rowStyle = { flex:1, flexDirection:'row' }
    const eleContainerStyle = { flex:2, flexDirection:'row', }
    const elementStyle = { flex:2, justifyContent:'space-around', alignItems:'center', flexDirection:'row', }
    const textStyle = { fontSize:side*.3 }


    return(
       <View style={[style, masterContainerStyle]}>
          <View style={rowStyle}>
            <View style={rowStyle}></View>
              <Dots ins={bonds[0] || dots[0]} bonded={bonds[0]} onPress={()=>this.onPressDots(0)}/>
            <View style={rowStyle}></View>
          </View>
          <View style={eleContainerStyle}>
            <View style={rowStyle}>
              <Dots vertical ins={bonds[3] || dots[3]} bonded={bonds[3]} onPress={()=>this.onPressDots(3)} />
            </View>
            <View style={elementStyle}>
              <Text style={textStyle}>{symbol}</Text>
            </View>
            <View style={rowStyle}>
              <Dots vertical ins={bonds[1] || dots[1]} bonded={bonds[1]} onPress={()=>this.onPressDots(1)} />
            </View>
          </View>
          <View style={rowStyle}>
            <View style={rowStyle}></View>
              <Dots ins={bonds[2] || dots[2]} bonded={bonds[2]} onPress={()=>this.onPressDots(2)} />
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
      dots = [...dots, (bonded?<Text key={i}>&#124;</Text>:<Text key={i}>&#8226;</Text>)]
    }
    return dots
  }

  render() {

    const { vertical, ins, style, bonded, onPress } = this.props
    const containerStyle = { flex:2, justifyContent:'center', alignItems:'center' }
    const dotStyle = {
      justifyContent:'space-around',
      alignItems:'center',
      flexDirection:'row',
      transform: vertical?[{ rotate: '90deg'}]:[]
    }

    return (
        <View style={[style, containerStyle]}>
          <TouchableWithoutFeedback onPress={onPress} >
            <View style={dotStyle} >
               {this.renderDots(ins,bonded)}
            </View>
          </TouchableWithoutFeedback>
        </View>
    )
  }
}
