import React, { Component } from 'react';
import { PanResponder, Animated, View, Button } from 'react-native';
import Linear from './LinearMolecule';
import TrigonalPlanar from './TrigonalPlanar';
import Tetrahedral from './Tetrahedral';


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
    return (
      <View style={{flex:1}}>
        <TrigonalPlanar panResponder={this.panResponder} pan={this.state.pan} />
        <Button onPress={()=>closeModal()} style={{position:'absolute', bottom:0, left:0, right:0}} title="Back to 2D"/>
      </View>
    )

  }

}
