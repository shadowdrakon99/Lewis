import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, StatusBar, Animated, Modal as Mod, Dimensions } from 'react-native';
import Canvas from './2DCanvas';
import Header from './header'
import { Container, Icon } from 'native-base';
import Modal from "./Modal"
import IBox from './IconBox'
import Tape from './TapeMeasure'
import ThreeDMolecule from './3DCanvas'

const elements = [
  {symbol:'H', vale:1},
  {symbol:'C', vale:4},
  {symbol:'N', vale:5},
  {symbol:'O', vale:6},
  {symbol:'F', vale:7},
]

export default class App extends Component {

  constructor() {
    super();
    this.state = {
      modalVisible: false,
      threeD:false,
      threeDViewScope:null,
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

  spawnAtom(element) {
    const { height, width } = Dimensions.get('window');
    const newState = this.state.atoms.slice()
    newState.push({...element, center:true, pan: new Animated.ValueXY({x:width/2,y:height/2}), bonds:[0,0,0,0,0,0]})
    this.setState({atoms:newState})
  }

  makeBond(bond, bondedIndex) {
    let newBonds = this.state.bonds.slice()
    newBonds.push(bond)
    let newBondedAtoms = this.state.atoms.slice()
    newBondedAtoms[bondedIndex].center=false
    for( domain in bond ) {
      if(!bond.hasOwnProperty(domain)) continue
      const atom = {...newBondedAtoms[bond[domain]]}
      let newBonds = atom.bonds.slice()
      newBonds[domain] = 1
      newBondedAtoms[bond[domain]].bonds = newBonds
    }
    this.setState({bonds:newBonds, atoms:newBondedAtoms})
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
    const bond = this.state.bonds.filter(b=>b[domain]===atom)[0]
    const domainwa = domain
    if(!bond) return
    let newAtoms = this.state.atoms.slice()
    let resetBond = false;
    let octetException = false;
    for ( domain in bond ) {
      if(!bond.hasOwnProperty(domain)) continue
      const atom = {...newAtoms[bond[domain]]}
      let newBonds = atom.bonds.slice()
      newBonds[domain] = (atom.bonds[domain]<3) ? atom.bonds[domain] + 1 : 0
      newAtoms[bond[domain]].bonds = newBonds
      if(newBonds[domain]===0) resetBond = true;
      if(domain=="5" || domain =="4") octetException={domain, atomIndex:this.state.bonds.find(b=>b[domain==="5"?3:1]===bond[domain])[domain==="5"?1:3]}
      console.log(domain)
    }
    if(resetBond) {
      let newBondState = this.state.bonds.filter(b=>b[domainwa]!==atom)
      newAtoms[bond[domainwa]].center = true
      if(octetException) {
        const { domain , atomIndex } = octetException;
        if(!atomIndex) return
        const { pan } = this.state.atoms[atomIndex]
        const { x, y } = pan.__getValue()
        pan.setOffset({x,y})
        pan.setValue({x:0,y:0})
        Animated.parallel([
          Animated.timing(pan.x, {toValue:domain==="5"?-3:3}),
          Animated.timing(pan.y, {toValue:domain==="5"?25:25}),
        ]).start()
      }
      this.setState({atoms:newAtoms, bonds:newBondState})
      return
    }
    this.setState({atoms:newAtoms, })

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

  make3D(index) {

    const centerAtom = this.state.atoms[index]
    const bondedAtoms = this.state.bonds
    .filter(b=>Object.values(b).indexOf(index)!==-1)
    .map(b=>{
      const domains = Object.keys(b)
      const atoms = Object.values(b)
      const isFirst = atoms[0]===index
      return {
        domain:domains[isFirst?0:1],
        ...this.state.atoms[atoms[isFirst?1:0]]
      }
    })

    if(bondedAtoms.filter(atom=>atom.bonds.filter(b=>b===0).length<3).length!==0) {
      alert('3D views of molecules with more than one center atom are not yet supported. Please drag with your finger on the only center atom.')
      return
    }

    this.setState({threeD:true, threeDViewScope:{centerAtom, bondedAtoms}})
  }

  render() {

    let { atoms, bonds, threeDViewScope } = this.state
    return (
      <Container style={{marginTop:StatusBar.currentHeight}}>
        <Tape />
        <Modal openModal = {this.openModal.bind(this)} spawnAtom = {this.spawnAtom.bind(this)} closeModal = {this.closeModal.bind(this)} modalVisible = {this.state.modalVisible}/>
        <Mod animationType="slide"  transparent={false} visible={this.state.threeD} onRequestClose={()=>this.setState({threeD:false})}><ThreeDMolecule viewScope={threeDViewScope} /></Mod>
        <View style={{position:'absolute', top:0, left:0, right:0, zIndex:1}} >
          <Header onMenuPress = {this.openModal.bind(this)} />
          <View style={{flexDirection:'row', justifyContent: 'space-between'}} >
            {this.renderButtons()}
          </View>
        </View>
        <Canvas atoms={atoms} bonds={bonds} onBond={this.makeBond.bind(this)} onPressDomain={this.onPressDomain.bind(this)} deleteAtom={this.deleteAtom.bind(this)} make3D={this.make3D.bind(this)}/>
        <IBox style={{ backgroundColor:'tomato', position:'absolute',  bottom:0,  right:0, }}><Icon name="trash"/></IBox>
        <IBox style={{ backgroundColor:'steelblue', position:'absolute',  bottom:0,  left:0, }}><Text style={{fontWeight:"500", fontSize:20}}>3D</Text></IBox>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  elementButton:{
    backgroundColor:'#4988ed',
    padding:10,
    width:20,
  }
})
