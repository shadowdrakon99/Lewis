import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native';
import  PeriodicTable from './Components/PeriodicTable'





export default class  App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
      <PeriodicTable/>

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
