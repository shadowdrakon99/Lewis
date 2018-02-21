import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native';
import  PeriodicTable from './Components/PeriodicTable';
import Header from './Components/header';
import { Container } from 'native-base';
import Modal from "./Components/Modal"
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

      <View style={styles.container}>
      <Container>
      <Modal openModal = {this.openModal.bind(this)} closeModal = {this.closeModal.bind(this)} modalVisible = {this.state.modalVisible}/>
        <Header onMenuPress = {this.openModal.bind(this)}/>
        <PeriodicTable/>
        </Container>
      </View>


    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
