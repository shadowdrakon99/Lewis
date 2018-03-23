import React, { Component } from 'react';
import { Text, View, TouchableWithoutFeedback } from 'react-native';
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
    bonds:[0,0,0,0,0,0],
    tilt:'0deg'
  }

  static propTypes = {
    side:PropTypes.number, // side length. should default to 50... if it doesn't this is a bug with Expo so just pass in 50 for this prop
    vale:PropTypes.number, // number of valence electrons. if this is set, it'll ignore left,right,top,bottom
    symbol:PropTypes.string, // Element symbol. Like Na, Mg, B, C, N, O, F, Ne ... defaults to H
    bonds:PropTypes.arrayOf(PropTypes.number), // number of bonds on [ top, right, bottom, left ] sides
    style:PropTypes.oneOfType([PropTypes.array, PropTypes.object]), // style of container
    onPressDomain:PropTypes.func.isRequired,
    tilt:PropTypes.string,
  }

  updateDots(newBonds) {
    const { vale } = this.state
    this.setState({ dots: this.valeToDots(vale, newBonds) })
  }

  valeToDots(vale, bonds) {
      let dots = [0,0,0,0,0,0]
      const sumBonds = bonds.reduce((a,b)=>a+b, 0)
      const numLone = vale - sumBonds

      if(sumBonds==0) {
        for(let i=0; i<numLone; i++) {
          let domain = i%4
          if(dots[domain]<2) dots[domain] += 1
        }
        return dots
      }

      let remainingElectrons = numLone;
      for(let i=0; i<6; i++) {
        if(bonds[i] > 0) continue;
        if(remainingElectrons<1) break;
        if(remainingElectrons>1) { dots[i] = 2; remainingElectrons = remainingElectrons - 2}
        else if(remainingElectrons === 1) { dots[i] = 1; remainingElectrons--}
      }
      return dots
  }

  componentWillReceiveProps(newProps) {
    this.updateDots(newProps.bonds)
  }

  render() {
    const { side, style, symbol, bonds, onPressDomain, tilt } = this.props
    const { dots } = this.state
    const masterContainerStyle = { height:side, width:side, transform:[{rotate:tilt}] }
    let etilt = tilt
    if(tilt==='30deg') {etilt = "-30deg"}
    else if (tilt==='-30deg') {etilt = "30deg"}
    const rowStyle = { flex:1, flexDirection:'row' }
    const eleContainerStyle = { flex:2, flexDirection:'row', }
    const elementStyle = { flex:2, justifyContent:'space-around', alignItems:'center', flexDirection:'row', transform:[{rotate:etilt}] }
    const dotStyle = {position:'absolute', top:0,left:0,bottom:0,right:0, }
    const textStyle = { fontSize:side*.3 }

    const renderDots = (position, vertical, transform) => (
        <Dots vertical={vertical}
        ins={bonds[position] || dots[position]}
        bonded={bonds[position]}
        onPress={()=>{onPressDomain(position)}}
        style={[dotStyle, transform?{transform}:null]}/>
      )

    return(
       <View style={[style, masterContainerStyle]}>
          <View style={rowStyle}>
            <View style={rowStyle}></View>
              {renderDots(0)}
            <View style={rowStyle}></View>
          </View>
          <View style={eleContainerStyle}>
            <View style={rowStyle}>
              {renderDots(3,true,(dots[5]+bonds[5]>0) ? [{rotate:'30deg'}, {translateX:-2},{translateY:-8}] : null )}
              {(dots[5]+bonds[5]>0) && renderDots(5,true,[{rotate:'-30deg'}, {translateX:-2},{translateY:8}])}
            </View>
            <View style={elementStyle}>
              <Text style={textStyle}>{symbol}</Text>
            </View>
            <View style={rowStyle}>
              {renderDots(1,true, (dots[4]+bonds[4]>0) ? [{rotate:'-30deg'}, {translateX:2},{translateY:-8}] : null)}
              {(dots[4]+bonds[4]>0) && renderDots(4,true,[{rotate:'30deg'}, {translateX:2},{translateY:8}])}
            </View>
          </View>
          <View style={rowStyle}>
            <View style={rowStyle}></View>
              {renderDots(2)}
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
  } // IDEA: if I can take out the padding in the side of the Text, &#9475; would be perfect to replace "|" b/c much higher

  render() {

    const { vertical, ins, style, bonded, onPress } = this.props
    const containerStyle = { flex:2, justifyContent:'center', alignItems:'center' }
    const dotStyle = {
      justifyContent:'center',
      alignItems:'center',
      flexDirection:'row',
      transform: vertical?[{ rotate: '90deg'}]:[],
    }

    return (
        <View style={[style, containerStyle]}>
          <TouchableWithoutFeedback onPress={onPress} hitSlop={{top:5,bottom:5,right:5,left:5}} >
            <View style={dotStyle} >
               {this.renderDots(ins,bonded)}
            </View>
          </TouchableWithoutFeedback>
        </View>
    )
  }
}
