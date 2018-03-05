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

        <Canvas atoms={atoms} bonds={bonds} onBond={this.makeBond.bind(this)}/>
        <Trashcan style = {{position:'absolute', bottom:10, right:10}}/>
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
