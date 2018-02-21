import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native';
import  PeriodicTable from './Components/PeriodicTable'
import Modals from './Components/Modal'





export default class  App extends React.Component {
  render() {
    return (

      <View style={styles.container}>
      <PeriodicTable/>
      <Modals/>
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
