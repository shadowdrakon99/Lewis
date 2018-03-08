import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Draggable from './Draggable'
import Lewis from './Lewis'

export default class extends Component {

  constructor() {
    super()
    this._getCluster = this._getCluster.bind(this)
  }

  _getCluster(index) {
    return this.props.bonds.filter(b=>Object.values(b).indexOf(index)!==-1)
      .reduce((ag, b)=>[...ag, ...Object.values(b)], [])
      .concat([index])
      .filter((v, i, s) => i===s.indexOf(v))
  }

  render() {

    const { symbol, vale, atoms, index, zones, onUpdate, bonds, onPressDomain, trashZone } = this.props;

    // IDEA: when deleting an element, set that draggable atom to null so that we don't lose the array index

    const { pan, bondedDomains } = atoms[index]

    let bonded = this._getCluster(index)

    let clusterSize;
    do {
      clusterSize=bonded.length
      bonded = bonded.map(this._getCluster)
      .reduce((ag, v) => [...ag, ...v], [])
      .filter((v, i, s) => i===s.indexOf(v))
    }
    while (bonded.length>clusterSize)

    const triggers = zones.filter( ({index}) => bonded.indexOf(index)===-1 )
    .map(v=>({...v, trigger:()=>v.trigger(index), })).concat([trashZone])

    const bondedPans = bonded.map(b=>atoms[b].pan)

    return (
      <Draggable pan={pan} onUpdate={onUpdate} triggers={triggers} bundled={bondedPans} >
        <Lewis side={50} symbol={symbol} vale={vale} bonds={bondedDomains} onPressDomain={onPressDomain} />
      </Draggable>
    )
  }
}
