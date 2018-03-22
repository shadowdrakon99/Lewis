import React, { Component } from 'react';
import { Text, View, Button, Modal, StyleSheet } from 'react-native';

const elements = [
  {symbol:'H', vale:1},
  {symbol:'He', vale:8},
  {symbol:'Li', vale:1},
  {symbol:'Be', vale:2},
  {symbol:'B', vale:3},
  {symbol:'C', vale:4},
  {symbol:'N', vale:5},
  {symbol:'O', vale:6},
  {symbol:'F', vale:7},
  {symbol:'Ne', vale:8},
  {symbol:'Na', vale:1},
  {symbol:'Mg', vale:2},
  {symbol:'Al', vale:3},
  {symbol:'Si', vale:4},
  {symbol:'P', vale:5},
  {symbol:'S', vale:6},
  {symbol:'Cl', vale:7},
  {symbol:'Ar', vale:8},
  ]


export default class Modals extends Component {

  render() {


    const { closeModal, openModal, modalVisible, spawnAtom } = this.props;

    return (
          <Modal

              visible={ modalVisible }
              animationType={'slide'}
              onRequestClose={() => closeModal()}
          >
            <View style={styles.modalContainer}>
            <Button onPress={() => closeModal()} title="<--"/>
              <View style={styles.innerContainer}>

              { elements.map((e,k) =>
                <Button color = "red" onPress={()=>{spawnAtom(e); closeModal()}} title={e.symbol} key={k}/>
              )}


              </View>
            </View>
          </Modal>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: "center",
    backgroundColor: 'grey',
  },
  innerContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent:'center',
    alignContent: 'flex-start',
    flexWrap:'wrap'
  },
});
