import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native';
<<<<<<< HEAD
import  PeriodicTable from './Components/PeriodicTable'
import Modals from './Components/Modal'
=======
import  PeriodicTable from './Components/PeriodicTable';
import Header from './Components/header'
import { Container } from 'native-base';
//import TopBar from './Components/PeriodicTable'
>>>>>>> 1baf5bd8d726f5d46952719055f08d05495fb4a8





export default class  App extends React.Component {
  render() {
    return (

      <View style={styles.container}>
<<<<<<< HEAD
      <PeriodicTable/>
      <Modals/>
=======
      <Container>
        <Header />
        <PeriodicTable/>
        </Container>
>>>>>>> 1baf5bd8d726f5d46952719055f08d05495fb4a8
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
