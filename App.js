import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native';
import  DragAndDrop from './Components/DragAndDrop';
import Header from './Components/header'
import { Container } from 'native-base';
import Modal from "./Components/Modal"
import Trashcan from './Components/Trashcan'
import Lewis from './Components/Lewis'
//import TopBar from './Components/PeriodicTable'





export default class  App extends React.Component {

  constructor() {
    super();
    this.state = {
      modalVisible: false,
    };
  }

  openModal() {
    this.setState({modalVisible:true});
  }

  closeModal() {
    this.setState({modalVisible:false});
  }

  render() {
    return (


      <Container>
      <Modal openModal = {this.openModal.bind(this)} closeModal = {this.closeModal.bind(this)} modalVisible = {this.state.modalVisible}/>
        <Header onMenuPress = {this.openModal.bind(this)}/>
        <DragAndDrop>
          <Lewis side={50} symbol="B" left={1} right={2} top={"bond"} />
        </DragAndDrop>
        <Trashcan style = {{alignItems:'flex-end'}}/>
        </Container>



    );
  }
}
