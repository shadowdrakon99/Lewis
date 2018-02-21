import React, { Component } from 'react';
import { Text, View, Button, Modal, StyleSheet } from 'react-native';

export default class Modals extends Component {
  state = {
    modalVisible: false,
  };

  openModal() {
    this.setState({modalVisible:true});
  }

  closeModal() {
    this.setState({modalVisible:false});
  }

  render() {
    return (
        <View style={styles.container}>
          <Modal
              visible={this.state.modalVisible}
              animationType={'slide'}
              onRequestClose={() => this.closeModal()}
          >
            <View style={styles.modalContainer}>
            <Button onPress={() => this.closeModal()} title="<--"/>
              <View style={styles.innerContainer}>

                <Button title="H" color = "red" onPress={() => this.closeModal()} />
                <Button title="He" color = "red"onPress={() => this.closeModal()}/>
                <Button title="Li" color = "red"onPress={() => this.closeModal()}/>
                <Button title="Be" color = "red"onPress={() => this.closeModal()}/>
                <Button title="B" color = "red"onPress={() => this.closeModal()}/>
                <Button title="C" color = "red"onPress={() => this.closeModal()}/>
                <Button title="N" color = "red"onPress={() => this.closeModal()}/>
                <Button title="O" color = "red"onPress={() => this.closeModal()}/>
                <Button title="F" color = "red"onPress={() => this.closeModal()}/>
                <Button title="Ne" color = "red"onPress={() => this.closeModal()}/>
                <Button title="Na" color = "red"onPress={() => this.closeModal()}/>
                <Button title="Mg" color = "red"onPress={() => this.closeModal()}/>
                <Button title="Al" color = "red"onPress={() => this.closeModal()}/>
                <Button title="Si" color = "red"onPress={() => this.closeModal()}/>
                <Button title="P" color = "red"onPress={() => this.closeModal()}/>
                <Button title="S" color = "red"onPress={() => this.closeModal()}/>
                <Button title="Cl" color = "red"onPress={() => this.closeModal()}/>
                <Button title="Ar" color = "red"onPress={() => this.closeModal()}/>


              </View>
            </View>
          </Modal>
          <Button
              onPress={() => this.openModal()}
              title="Elements"
          />
        </View>
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
