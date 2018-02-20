import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native';
import  PeriodicTable from './Components/PeriodicTable';
import Header from './Components/header'
import { Container } from 'native-base';
//import TopBar from './Components/PeriodicTable'





export default class  App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
      <Container>
        <Header />
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
