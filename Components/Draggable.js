import React, { Component } from 'react'
import { View, StyleSheet, Animated, PanResponder, Dimensions } from 'react-native'
import PropTypes from 'prop-types'

export default class extends Component {

  static propTypes = {
    height: PropTypes.number,
    width: PropTypes.number,
    x0: PropTypes.number,
    y0: PropTypes.number,
  }

  static defaultProps = {
    height:50,
    width:50,
    x:100,
    y:100,
    pan: new Animated.ValueXY(),
  }

  constructor({ x, y }) {
    super()
    this._pos = { x, y }
    this.getBundled = this.getBundled.bind(this)
    this.getTriggers = this.getTriggers.bind(this)
  }

  getBundled() {
    return this.props.bundled
  }

  getTriggers() {
    return this.props.triggers
  }

  componentWillMount() {
    const { pan, onUpdate, width, height, bundled } = this.props
    pan.addListener(v=>{this._pos = v})
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: ()=>true,
      onPanResponderGrant:(e,g) => {
        pan.setOffset({x:this._pos.x, y:this._pos.y})
        pan.setValue({x:0,y:0})
        this.getBundled().forEach(p=>{
          let {x,y} = p.__getValue() // FIXME: this is a workaround. we should avoid calling the private function getValue
          p.setOffset({x, y})
          p.setValue({x:0,y:0})
        })
      },
      onPanResponderMove:Animated.event([null, {dx: pan.x, dy: pan.y}, ]),
      onPanResponderMove:(e,g) => {

        return this.getBundled().forEach(p=>p.setValue({x:g.dx, y:g.dy}))
      },
      onPanResponderRelease:() => {
        let { x, y } = pan.__getValue() // FIXME: this is a workaround. we should avoid calling the private function getValue
        x = x+width/2
        y = y+height/2
        const triggered = this.getTriggers().filter(
          ({ bounds:{ upper,lower,left,right } })=> (y > upper) && (y < lower) && (x > left) && (x < right)
        ).map(t=>t.trigger)
        console.log("triggers"+this.getTriggers.length)
        console.log("triggered"+triggered.length)
        triggered.forEach(f=>f())

        onUpdate()
      }
    })
  }

  render() {
    const { width, height, pan, style } = this.props
    const panStyle = { position:'absolute', top:0, left:0, transform:pan.getTranslateTransform(), width, height }
    return(
      <Animated.View {...this._panResponder.panHandlers} style={[panStyle, style]}>
        {this.props.children}
      </Animated.View>
    )
  }
}
