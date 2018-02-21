import React, { Component } from 'react';
import { Text, View, Button, Modal, StyleSheet } from 'react-native';

export default class Modals extends Component {




  render() {


    const { closeModal, openModal, modalVisible } = this.props;

    return (
          <Modal
              visible={ modalVisible }
              animationType={'slide'}
              onRequestClose={() => closeModal()}
          >
            <View style={styles.modalContainer}>
            <Button onPress={() => closeModal()} title="<--"/>
              <View style={styles.innerContainer}>

                <Button title="H" color = "red" onPress={() => closeModal()} />
                <Button title="He" color = "red"onPress={() => closeModal()}/>
                <Button title="Li" color = "red"onPress={() => closeModal()}/>
                <Button title="Be" color = "red"onPress={() => closeModal()}/>
                <Button title="B" color = "red"onPress={() => closeModal()}/>
                <Button title="C" color = "red"onPress={() => closeModal()}/>
                <Button title="N" color = "red"onPress={() => closeModal()}/>
                <Button title="O" color = "red"onPress={() => closeModal()}/>
                <Button title="F" color = "red"onPress={() => closeModal()}/>
                <Button title="Ne" color = "red"onPress={() => closeModal()}/>
                <Button title="Na" color = "red"onPress={() => closeModal()}/>
                <Button title="Mg" color = "red"onPress={() => closeModal()}/>
                <Button title="Al" color = "red"onPress={() => closeModal()}/>
                <Button title="Si" color = "red"onPress={() => closeModal()}/>
                <Button title="P" color = "red"onPress={() => closeModal()}/>
                <Button title="S" color = "red"onPress={() => closeModal()}/>
                <Button title="Cl" color = "red"onPress={() => closeModal()}/>
                <Button title="Ar" color = "red"onPress={() => closeModal()}/>


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
