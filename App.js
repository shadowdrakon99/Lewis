import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, StatusBar, Animated } from 'react-native';
import Canvas from './Components/2DCanvas';
import Header from './Components/header'
import { Container } from 'native-base';
import Modal from "./Components/Modal"
import Trashcan from './Components/Trashcan'
import Expo from 'expo'
import Tape from './Components/TapeMeasure'

const elements = [
  {symbol:'C', vale:4},
  {symbol:'N', vale:5},
  {symbol:'O', vale:6},
  {symbol:'F', vale:7},
  {symbol:'Ne', vale:8},
]

class App extends Component {

  constructor() {
    super();
    this.state = {
      modalVisible: false,
      atoms:[],
      bonds:[]
    };
    this._getCluster = this._getCluster.bind(this)
  }

  openModal() {
    this.setState({modalVisible:true});
  }

  closeModal() {
    this.setState({modalVisible:false});
  }

  spawnAtom({symbol, vale}) {
    const newState = this.state.atoms.slice()
    newState.push({symbol, vale, pan: new Animated.ValueXY({x:100,y:100}), bonds:[0,0,0,0]})
    this.setState({atoms:newState})
  }

  makeBond(bond) {
    const newState = this.state.bonds.slice()
    newState.push(bond)
    this.setState({bonds:newState})
  }

  renderButtons() {
    return elements.map((e,k) =>
      <Button style={styles.elementButton} onPress={()=>this.spawnAtom(e)} title={e.symbol} key={k}/>
    )
  }

  /*Could def use the <StatusBar /> cmpt from RN to make it prettier*/

  addBond(domain, bonds) {
    return (bonds[domain]<3) ? bonds[domain] + 1 : 0
  } // IDEA: we could actually just add this into the makeBond function somehow? or nah....

  onPressDomain(domain, atom) {
    let newState = this.state.atoms.slice()
    let pressedAtom = { ...newState[atom] }
    // let bondedAtom = this.state.bonds.filter(b=>)
      let newBonds = pressedAtom.bonds.slice()

    // bonds[domain] = addBond(domain, bonds)
    // newState[atom].bonds = bonds
    // this.setState({atoms:newState})
  } //TODO: update all bonded atoms instead of just the atom pressed
  // TODO: need a check to make sure we aren't trying to form a bond with something that already has 3 bonds

  getBondedAtoms() {

  }

  _getCluster(index) {
    return this.state.bonds.filter(b=>Object.values(b).indexOf(index)!==-1)
      .reduce((ag, b)=>[...ag, ...Object.values(b)], [])
      .concat([index])
      .filter((v, i, s) => i===s.indexOf(v))
  }

  deleteAtom(index) {
    let bonded = this._getCluster(index)
    let clusterSize;
    do {
      clusterSize=bonded.length
      bonded = bonded.map(this._getCluster)
      .reduce((ag, v) => [...ag, ...v], [])
      .filter((v, i, s) => i===s.indexOf(v))
    }
    while (bonded.length>clusterSize)

    let atoms = this.state.atoms.slice()
    let bonds = this.state.bonds.slice()
    bonded.forEach(v=>{
      atoms[v] = null
      bonds = bonds.filter(b=>Object.values(b).indexOf(v)===-1)
    })

    this.setState({atoms, bonds})
  }

  render() {

    let { atoms, bonds } = this.state
    return (
      <Container style={{marginTop:StatusBar.currentHeight}}>
      <Tape />
        <Modal openModal = {this.openModal.bind(this)} closeModal = {this.closeModal.bind(this)} modalVisible = {this.state.modalVisible}/>
        <Header onMenuPress = {this.openModal.bind(this)}/>

        <View style={{flexDirection:'row', justifyContent: 'space-between' }}>
          {this.renderButtons()}
        </View>
        <Canvas atoms={atoms} bonds={bonds} onBond={this.makeBond.bind(this)} onPressDomain={this.onPressDomain.bind(this)} deleteAtom={this.deleteAtom.bind(this)}/>
        <Trashcan style = {{ backgroundColor:'red' }}/>
      </Container>
    );
  }
}

export default class DevAppWrap extends Component {

  constructor() {
    super()
    this.state={
      loading:false,
    }
  }

  async componentWillMount() {
    this.setState({loading:true})
    await Expo.Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
    });
    this.setState({loading:false})
  }

  render() {
    if(this.state.loading===true) {
      return(<Expo.AppLoading />)
    } else {
      return (
        <App />
      );
    }
  }
}

const styles = StyleSheet.create({
  elementButton:{
    backgroundColor:'#4988ed',
    padding:10,
    width:20,
  }
})
