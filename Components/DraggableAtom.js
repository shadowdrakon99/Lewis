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

    const { symbol, vale, atoms, index, zones, onUpdate, bonds, onPressDomain, trashZone, threeDZone } = this.props;

    const { pan, bonds:bondedDomains, center } = atoms[index]

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
    .map(v=>({...v, trigger:()=>v.trigger(index), })).concat([trashZone, threeDZone])

    const bondedPans = bonded.map(b=>atoms[b].pan)

    let tilt = "0deg"
    if( center === false ) {
      const bond = bonds.find(b=>Object.values(b).indexOf(index)!==-1)
      if(bond) {
        const pos = Object.keys(bond)[(Object.values(bond)[0] !== index)?0:1]
        const centerAtom = atoms[bond[pos]]
        switch(pos) {
          case '1':
            if(centerAtom.bonds[4]!==0) tilt = "-30deg";
            break;
          case '3':
            if(centerAtom.bonds[5]!==0) tilt = "30deg";
            break;
          case '4':
            tilt = "30deg";
            break;
          case '5':
            tilt = "-30deg";
            break;
          default:
            break;
        }
      }
    }

    return (
      <Draggable pan={pan} onUpdate={onUpdate} triggers={triggers} bundled={bondedPans} >
        <Lewis tilt={tilt} symbol={symbol} vale={vale} bonds={bondedDomains} onPressDomain={onPressDomain} />
      </Draggable>
    )
  }
}
