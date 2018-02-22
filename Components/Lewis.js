import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types'

export default class Lewis extends Component {

  constructor() {
    super()
    this.state={
      dots:[0,0,0,0] //top right bottom left
    }
  }

  static defaultProps = {
    side:50,
    symbol:"H",
  }

  static propTypes = {
    side:PropTypes.number, // side length. should default to 50... if it doesn't this is a bug with Expo so just pass in 50 for this prop
    vale:PropTypes.number, // number of valence electrons. if this is set, it'll ignore left,right,top,bottom
    symbol:PropTypes.string, // Element symbol. Like Na, Mg, B, C, N, O, F, Ne ... defaults to H
    left:PropTypes.oneOfType([PropTypes.number,PropTypes.string]), // number of electrons left side
    right:PropTypes.oneOfType([PropTypes.number,PropTypes.string]), // number of electrons right side
    top:PropTypes.oneOfType([PropTypes.number,PropTypes.string]), // number of electrons top side
    bottom:PropTypes.oneOfType([PropTypes.number,PropTypes.string]), // number of electrons bottom side
    style:PropTypes.oneOfType([PropTypes.array, PropTypes.object]) // style of container
  }

  componentWillMount() {
    const { vale, left, right, top, bottom } = this.props
    if (vale!==null && vale!==undefined) {
      this.valeToDots(vale)
    } else {
      this.setState({dots:[top, right, bottom, left]})
    }
  }

  valeToDots(vale) {

      let dots = this.state.dots.slice()
      for(let i=0; i<vale; i++) {
        let cursor = i % 4
        dots[cursor]= dots[cursor] + 1
      }
      this.setState({dots})

  }

  render() {

    const { side, style, symbol, } = this.props
    const { dots } = this.state
    const rowStyle = { flex:1, flexDirection:'row' }
    const containerStyle = { flex:2, flexDirection:'row' }
    const elementStyle = { flex:2, justifyContent:'space-around', alignItems:'center', flexDirection:'row', }
    const textStyle = { fontSize:side*.5 }


    return(
       <View style={[style, { height:side, width:side, }]}>
          <View style={rowStyle}>
            <View style={rowStyle}></View>
              <Dots ins={dots[0]} />
            <View style={rowStyle}></View>
          </View>
          <View style={containerStyle}>
            <View style={rowStyle}>
              <Dots vertical ins={dots[3]} />
            </View>
            <View style={elementStyle}>
              <Text style={textStyle}>{symbol}</Text>
            </View>
            <View style={rowStyle}>
              <Dots vertical ins={dots[1]} />
            </View>
          </View>
          <View style={rowStyle}>
            <View style={rowStyle}></View>
              <Dots ins={dots[2]} />
            <View style={rowStyle}></View>
          </View>
       </View>
    )
  }
}

class Dots extends Component {

  renderDots(num) {
    let dots = []
    for(let i = 0; i<num; i++ ) {
      dots = [...dots, (<Text key={i}>&#8226;</Text>)]
    }
    return dots
  }

  renderBond(vertical) {
    if(vertical) return <Text >&#8722;</Text>
    else return <Text >&#124;</Text>
  }

  render() {

    const { vertical, ins, style } = this.props

    const bonded = typeof(ins)==='string'

    const dotStyle = { flex:2, justifyContent:'space-around', alignItems:'center', }

    return (
        <View style={[style, dotStyle, {flexDirection:vertical?'column':'row'}]}>
           {bonded?this.renderBond(vertical):this.renderDots(ins)}
        </View>
    )
  }
}
