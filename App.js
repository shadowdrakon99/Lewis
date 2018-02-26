import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, StatusBar } from 'react-native';
import DragAndDrop from './Components/DragAndDrop';
import Header from './Components/header'
import { Container } from 'native-base';
import Modal from "./Components/Modal"
import Trashcan from './Components/Trashcan'
import Lewis from './Components/Lewis'
//import TopBar from './Components/PeriodicTable'
import Expo from 'expo'

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
    newState.push({symbol, vale})
    this.setState({atoms:newState})
  }

  renderButtons() {
    return elements.map( (e,k) =>
      <Button style={styles.elementButton} onPress={()=>this.spawnAtom(e)} title={e.symbol} key={k}/>
    )
  }

  /*Could def use the <StatusBar /> cmpt from RN to make it prettier*/

  render() {
    return (
      <Container style={{marginTop:StatusBar.currentHeight}}>
      <Modal openModal = {this.openModal.bind(this)} closeModal = {this.closeModal.bind(this)} modalVisible = {this.state.modalVisible}/>
        <Header onMenuPress = {this.openModal.bind(this)}/>
        <View style={{flexDirection:'row', justifyContent: 'space-between', flex:1 }}>
          {this.renderButtons()}
        </View>
        {this.state.atoms.map(({symbol, vale},k)=>(
          <DragAndDrop key={k}><Lewis side={50} symbol={symbol} vale={vale}/></DragAndDrop>
        ))}
        <Trashcan style = {{alignItems:'flex-end'}}/>
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
        <App/>
      );
    }
  }
}

const styles = StyleSheet.create({
  elementButton:{
    backgroundColor:'#4988ed',
    padding:10,
  }
})
