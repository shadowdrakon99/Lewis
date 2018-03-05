import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Draggable from './Draggable'
import Lewis from './Lewis'

export default class extends Component {
  render() {

    const { symbol, vale, atoms, index, zones, onUpdate, bonds } = this.props;

    // atoms.filter( find those that are bonded to this atom )
    // .map( leave us with an array of pans of those atoms )
    // ^ pass that stuff into Draggable as pans to update onMove
    //
    // IDEA: when deleting an element, set that draggable atom to null so that we don't lose the array index

    const { pan, bonds:[top, right, bottom, left ]} = atoms[index]

    const bonded = bonds.filter(b=>b[1]===index || b[2]===index)
    .map(v=>(v[1]!==index)?v[1]:v[2])

    const triggers = zones.filter( v => {
      if(v.index===index) return false
      if(bonded.indexOf(v.index)!==-1) return false
      return true
    }).map(v=>({...v, trigger:()=>v.trigger(index), }))
    // TODO: make a callback to delete atoms (also add better index) and put the trasn functionality back
    //

    const bondedPans = bonded.map(b=>atoms[b].pan)
    // TODO: recursively get all the atoms bonded to the stuff bonded to this atom so we can move things with more than one center atom

    return (
      <Draggable pan={pan} onUpdate={onUpdate} triggers={triggers} bundled={bondedPans} >
        <Lewis side={50} symbol={symbol} vale={vale} top={top} bottom={bottom} left={left} right={right}/>
      </Draggable>
    )
  }
}
