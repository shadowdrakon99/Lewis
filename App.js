import React, { Component } from 'react';
import {Animated} from 'react-native';
import App from './Components/LinearMolecule'
import Expo from 'expo'

export default class DevAppWrap extends Component {

  constructor() {
    super()
    this.state={
      loading:false,
    }
  }

  async componentWillMount() {
    this.setState({loading:true})
    await Expo.Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
    });
    this.setState({loading:false})
  }

  render() {
    if(this.state.loading===true) {
      return(<Expo.AppLoading />)
    } else {
      return (
        <App />
      );
    }
  }
}
