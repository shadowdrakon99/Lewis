import React, { Component } from 'react'
import { View, Animated } from 'react-native'

import DraggableAtom from './DraggableAtom'


export default class extends Component {

  constructor() {
    super()
    this.makeBondTrig = this.makeBondTrig.bind(this)
    this.onBond = this.onBond.bind(this)
  }

  onBond(bonded,{upper, left}) {
    const { pan } = this.props.atoms[bonded] //FIXME: will probably have to replace array index with a key assigned to each atom later
    const { x, y } = pan.__getValue()
    const snap = {dx:left-x, dy:upper-y}
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
        return (bonded)=>{this.onBond(bonded,bounds); this.props.onBond({1:bonded, 2:index, vertical:true})}
        break;
      case 'bottom':
        return (bonded)=>{this.onBond(bonded,bounds); this.props.onBond({1:index, 2:bonded, vertical:true})}
        break;
      case 'left':
        return (bonded)=>{this.onBond(bonded,bounds); this.props.onBond({1:bonded, 2:index, vertical:false})}
        break;
      case 'right':
        return (bonded)=>{this.onBond(bonded,bounds); this.props.onBond({1:index, 2:bonded, vertical:false})}
        break;
    }
  }

  render() {

    const { atoms, bonds, onBond } = this.props;

    const zones = atoms.map((a,k)=>{
      let { x, y } = a.pan.__getValue() // FIXME: this is a workaround. we should avoid calling the private function getValue
      return {
        index:k,
        top:{upper:y-50, lower:y, right:x+50, left:x},
        bottom:{upper:y+50, lower:y+(2*50), right:x+50, left:x},
        left:{upper:y, lower:y+50, left:x-50, right:x},
        right:{upper:y, lower:y+50, left:x+50, right:x+(2*50)}
      }})
    .reduce(
      (ag, { index, top, bottom, left, right })=>([
        ...ag,
        {index, trigger:this.makeBondTrig(index,'top', top), bounds:top},
        {index, trigger:this.makeBondTrig(index,'bottom', bottom), bounds:bottom},
        {index, trigger:this.makeBondTrig(index,'left', left), bounds:left},
        {index, trigger:this.makeBondTrig(index,'right', right), bounds:right},
      ]), [])

    return (
      <View style={{position:'absolute', top:0, bottom:0, right:0, left:0, }}>
        {atoms.map((props ,k, ar)=>(
          <DraggableAtom {...props} key={k} atoms={ar} bonds={bonds} index={k} zones={zones} onUpdate={this.forceUpdate.bind(this)}/>
        ))}
      </View>
    )
  }

}
