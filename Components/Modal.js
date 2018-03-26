import React, { Component } from 'react';
import { View, Modal, StyleSheet, TouchableHighlight, ScrollView } from 'react-native';
import { Button, Text } from 'native-base'
import elements from '../lib/elements';

export default class Modals extends Component {

  render() {

    const { closeModal, openModal, modalVisible, spawnAtom } = this.props;

    return (
          <Modal visible={ modalVisible } animationType={'slide'}  onRequestClose={() => closeModal()} style={{flex:1}}>
              <View style={styles.innerContainer}>
                  {elements.map((e,k) => (
                      <TouchableHighlight style={[styles.elementButton, {backgroundColor:e.color}]} onPress={()=>{spawnAtom(e); closeModal()}} key={k}>
                        <Text style={{color:e.color=='#ffffff'?'black':'white'}}>{e.symbol}</Text>
                      </TouchableHighlight>
                    )
                  )}
              </View>
              <Button full light onPress={() => closeModal()}><Text>Back</Text></Button>
          </Modal>

    );
  }
}

const styles = StyleSheet.create({
  innerContainer: {
    flex: 1,
    justifyContent:'center',
    backgroundColor:'#d3f5ff',
    flexWrap:'wrap',
    alignItems:'center'
  },
  elementButton: {
    width:'30%',
    margin:5,
    padding:20,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:5
  }
});
