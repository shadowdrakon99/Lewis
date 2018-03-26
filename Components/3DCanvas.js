import React, { Component } from 'react';
import { PanResponder, Animated, View } from 'react-native';
import { Button, Text } from 'native-base';
import Linear from './LinearMolecule';
import TrigonalPlanar from './TrigonalPlanar';
import Tetrahedral from './Tetrahedral';
import LinearMolecule from './LinearMolecule';
import TrigonalBipyramidal from './TrigonalBipyramidal';
import Octahedral from './Octahedral';


export default class ThreeDCanvas extends Component {

  constructor() {
    super()
    this.state={pan: new Animated.ValueXY(), molecular:true};
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
    const electronDomains = totalBonds>0
    ? (molecularDomains + Math.ceil(lonePairElectrons/2))
    : (centerAtom.vale<4?centerAtom.vale:4)

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

    renderLegendItem = ({symbol, color}, k=-1, array=null) => {
      if(array && array.map(v=>v.color).indexOf(color) !== k) return;
      return (
        <View key={k} style={{flexDirection:'row', alignItems:'center', justifyContent:'center', width:'100%', position:'relative'}}>
          <View style={{backgroundColor:color, borderRadius:5, width:10, height:10, borderWidth:.3 }}/>
          <Text>{symbol}</Text>
        </View>
      )
    }

    return (
      <Animated.View style={{flex:1}} {...this.panResponder.panHandlers}>
        { this.state.molecular
          ?<Molecule pan={this.state.pan} center={ centerAtom } bonded={ bondedAtoms } molecular />
          :null
        }
        { this.state.molecular
          ?null
          :<Molecule pan={this.state.pan} center={ centerAtom } molecular={false} />
        }
        <View style={{position:'absolute', bottom:100, right:0, width:40, zIndex:-1, height:'100%', justifyContent:'flex-end'}} >
          {renderLegendItem(centerAtom)}
          {bondedAtoms.map(renderLegendItem)}
        </View>
        <Button style={{position:'absolute', bottom:50, left:0, right:0}} rounded light full onPress={()=>this.setState({molecular:!this.state.molecular})}>
          <Text>Switch to {this.state.molecular?"Electron":"Molecular"} Domain Geometry</Text>
        </Button>
        <Button
        onPress={()=>closeModal()}
        style={{position:'absolute', bottom:0, left:0, right:0}}>
          <Text>Back To 2D</Text>
        </Button>
      </Animated.View>
    )
  }

}
