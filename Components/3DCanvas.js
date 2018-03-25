import React, { Component } from 'react';
import { PanResponder, Animated, View, Button } from 'react-native';
import Linear from './LinearMolecule';
import TrigonalPlanar from './TrigonalPlanar';
import Tetrahedral from './Tetrahedral';
import LinearMolecule from './LinearMolecule';
import TrigonalBipyramidal from './TrigonalBipyramidal';
import Octahedral from './Octahedral';


export default class ThreeDCanvas extends Component {

  constructor() {
    super()
    this.state={pan: new Animated.ValueXY()};
  }

  componentWillMount() {

    this._val = { x:0, y:0 }
    this.state.pan.addListener((value) => this._val = value);

    this.panResponder = PanResponder.create({
        onStartShouldSetPanResponder: (e, gesture) => true,
        onPanResponderGrant: (e, gesture) => {
          this.state.pan.setOffset({
            x: this._val.x,
            y:this._val.y
          })
          this.state.pan.setValue({ x:0, y:0})
        },
        onPanResponderMove: Animated.event([ null,
            { dx: this.state.pan.x, dy: this.state.pan.y }
        ]),
        onPanResponderRelease: (e,g) => {
          this.state.pan.setValue({x:0, y:0})
        }
      });
  }

  render() {
    const { centerAtom, bondedAtoms } = this.props.viewScope;
    const { closeModal } = this.props

    const totalBonds = centerAtom.bonds.reduce((a,v) => a+v, 0)
    const lonePairElectrons = centerAtom.vale - totalBonds

    const molecularDomains = centerAtom.bonds.reduce((a,v) =>{ if(v!=0){ return (a+1)} else{return a}}, 0)
    const electronDomains = molecularDomains + (totalBonds===0?4:Math.floor(lonePairElectrons/2))

    let Molecule

    switch(electronDomains) {
      case 2:
        Molecule = LinearMolecule
        break
      case 3:
        Molecule = TrigonalPlanar
        break
      case 4:
        Molecule = Tetrahedral
        break
      case 5:
        Molecule = TrigonalBipyramidal
        break
      case 6:
        Molecule = Octahedral
        break
      default:
        Molecule = Tetrahedral
        break
    }

    return (
      <Animated.View style={{flex:1}} {...this.panResponder.panHandlers}>
        <Molecule pan={this.state.pan} />
        <Button onPress={()=>closeModal()} style={{position:'absolute', bottom:0, left:0, right:0}} title="Back to 2D"/>
      </Animated.View>
    )

  }

}
