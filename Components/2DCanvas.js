import React, { Component } from 'react'
import { View, Animated, Dimensions, Platform } from 'react-native'

import DraggableAtom from './DraggableAtom'


export default class extends Component {

  constructor() {
    super()
    this.makeBondTrig = this.makeBondTrig.bind(this)
    this.onBond = this.onBond.bind(this)
  }

  onBond(bonded,{upper, left}, index, octetException) {
    const { pan } = this.props.atoms[bonded]
    const { x, y } = pan.__getValue()
    let snap = {dx:left-x, dy:upper-y}
    let cpan, cx, cy
    switch(octetException) {
      case 1:
        snap = {dx: snap.dx-3, dy:snap.dy+25}
        cpan = this.props.atoms[this.props.bonds.find(b=>b[1]===index)[3]].pan
        cx = cpan.__getValue().x
        cy = cpan.__getValue().y
        cpan.setOffset({x:cx, y:cy})
        cpan.setValue({x:0,y:0})
        Animated.parallel([
          Animated.timing(cpan.x, {toValue:-3}),
          Animated.timing(cpan.y, {toValue:-25}),
        ]).start()
        break;
      case 3:
        snap = {dx: snap.dx+3, dy:snap.dy+25}
        cpan = this.props.atoms[this.props.bonds.find(b=>b[3]===index)[1]].pan
        cx = cpan.__getValue().x
        cy = cpan.__getValue().y
        cpan.setOffset({x:cx, y:cy})
        cpan.setValue({x:0,y:0})
        Animated.parallel([
          Animated.timing(cpan.x, {toValue:+3}),
          Animated.timing(cpan.y, {toValue:-25}),
        ]).start()
        break;
      default:
    }
    pan.setOffset({x,y})
    pan.setValue({x:0,y:0})
    Animated.parallel([
      Animated.timing(pan.x, {toValue:snap.dx}),
      Animated.timing(pan.y, {toValue:snap.dy}),
    ]).start()
  }

  makeBondTrig(index, zone, bounds, octetException) {
    const {atoms} = this.props
    switch(zone) {
      case 'top':
        return (bonded)=>{if(!atoms[bonded].center) { return }; this.onBond(bonded,bounds); this.props.onBond({2:bonded, 0:index}, bonded, index)}
        break;
      case 'bottom':
        return (bonded)=>{if(!atoms[bonded].center) { return }; this.onBond(bonded,bounds); this.props.onBond({2:index, 0:bonded}, bonded)}
        break;
      case 'left':
        return (bonded)=>{if(!atoms[bonded].center) { return }; this.onBond(bonded,bounds, index, octetException); this.props.onBond(octetException?{1:bonded, 5:index}:{1:bonded, 3:index}, bonded)}
        break;
      case 'right':
        return (bonded)=>{if(!atoms[bonded].center) { return }; this.onBond(bonded,bounds, index, octetException); this.props.onBond(octetException?{4:index, 3:bonded}:{1:index, 3:bonded}, bonded)}
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

  make3DZone(index) {
    const { height, width } = Dimensions.get('window')
    return {
      trigger:()=>this.props.make3D(index),
      bounds: {upper:height-75, lower:height, left:0, right:75}
    }
  }

  render() {

    const { atoms, bonds, onBond, onPressDomain, } = this.props

    const zones = atoms.map((a,k)=>{
      if(a===null) return null
      if(a.center===false) return null
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
        const atom = atoms[index]
        let trigs = []
        if(atom.bonds[0]===0) trigs.push({index, trigger:this.makeBondTrig(index,'top', top), bounds:top})
        if(atom.bonds[2]===0) trigs.push({index, trigger:this.makeBondTrig(index,'bottom', bottom), bounds:bottom})
        if(atom.bonds[3]<2) trigs.push({index, trigger:this.makeBondTrig(index,'left', left, atom.bonds[3]===1&&3), bounds:left})
        if(atom.bonds[1]<2) trigs.push({index, trigger:this.makeBondTrig(index,'right', right, atom.bonds[1]===1&&1), bounds:right})
        return [ ...ag, ...trigs,]
      }, [])

      let zIndex = Platform.OS === 'ios' ? {zIndex:0} : null

    return (
      <View style={[{position:'absolute', top:0, bottom:0, right:0, left:0, }, zIndex ]}>
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
            threeDZone = {this.make3DZone(k)}
            onUpdate={this.forceUpdate.bind(this)}/>
          )
        })}
      </View>
    )
  }

}
