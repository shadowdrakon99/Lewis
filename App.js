import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native';
import  PeriodicTable from './Components/PeriodicTable'
import ElementField from './Components/ElementField'
import TopBar from './Components/TopBar'



export default class  App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
<<<<<<< HEAD
        <PeriodicTable />
=======
        <ElementField />
>>>>>>> 6a8b1377fa2556aaa82564c3f0a6fed65f59dce6

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
