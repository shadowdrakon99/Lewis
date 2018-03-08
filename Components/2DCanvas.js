import React, { Component } from 'react'
import { View, Animated, Dimensions } from 'react-native'

import DraggableAtom from './DraggableAtom'


export default class extends Component {

  constructor() {
    super()
    this.makeBondTrig = this.makeBondTrig.bind(this)
    this.onBond = this.onBond.bind(this)
  }

  onBond(bonded,{upper, left}) {
    const { pan } = this.props.atoms[bonded]
    const { x, y } = pan.__getValue()
    const snap = {dx:left-x, dy:upper-y} // FIXME: this is def the place that's making the atoms jump when i don't want them to
    pan.setOffset({x,y})
    pan.setValue({x:0,y:0})
    Animated.parallel([
      Animated.timing(pan.x, {toValue:snap.dx}),
      Animated.timing(pan.y, {toValue:snap.dy}),
    ]).start()
  }

  makeBondTrig(index, zone, bounds) {
    switch(zone) {
      case 'top':
        return (bonded)=>{this.onBond(bonded,bounds); this.props.onBond({0:bonded, 2:index})}
        break;
      case 'bottom':
        return (bonded)=>{this.onBond(bonded,bounds); this.props.onBond({0:index, 2:bonded})}
        break;
      case 'left':
        return (bonded)=>{this.onBond(bonded,bounds); this.props.onBond({3:bonded, 1:index})}
        break;
      case 'right':
        return (bonded)=>{this.onBond(bonded,bounds); this.props.onBond({1:index, 3:bonded})}
        break;
    }
  }

  makeTrashZone(index) {
    const { height, width } = Dimensions.get('window')
    return {
      trigger:()=>this.props.deleteAtom(index),
      bounds: {upper:height-75, lower:height, left:width-75, right:width}
    }
  }

  render() {

    const { atoms, bonds, onBond, onPressDomain, } = this.props

    const zones = atoms.map((a,k)=>{
      if(a===null) return null
      let { x, y } = a.pan.__getValue() // FIXME: this is a workaround. we should avoid calling the private function getValue
      return {
        index:k,
        top:{upper:y-50, lower:y, right:x+50, left:x},
        bottom:{upper:y+50, lower:y+(2*50), right:x+50, left:x},
        left:{upper:y, lower:y+50, left:x-50, right:x},
        right:{upper:y, lower:y+50, left:x+50, right:x+(2*50)}
      }})
    .reduce(
      (ag, v)=>{
        if (v === null) return ag
        let { index, top, bottom, left, right } = v
        return [
          ...ag,
          {index, trigger:this.makeBondTrig(index,'top', top), bounds:top},
          {index, trigger:this.makeBondTrig(index,'bottom', bottom), bounds:bottom},
          {index, trigger:this.makeBondTrig(index,'left', left), bounds:left},
          {index, trigger:this.makeBondTrig(index,'right', right), bounds:right},
        ]
      }, [])

    return (
      <View style={{position:'absolute', top:0, bottom:0, right:0, left:0, }}>
        {atoms.map((props ,k, ar)=>{
          if(props===null) return null
          return (
            <DraggableAtom {...props}
            key={k}
            atoms={ar}
            bonds={bonds}
            onPressDomain={(domain)=>onPressDomain(domain, k)}
            index={k}
            zones={zones}
            trashZone = {this.makeTrashZone(k)}
            onUpdate={this.forceUpdate.bind(this)}/>
          )
        })}
      </View>
    )
  }

}
