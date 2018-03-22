import React, { Component } from 'react';
import { Header, Left, Body, Right, Container, Icon, Button, Title } from 'native-base';
import Modals from "./Modal";
export default class extends Component {

  render() {
    const { onMenuPress } = this.props

    return(
      <Header>
            <Left>
            </Left>
            <Body>
              <Title>Lewis Model</Title>
            </Body>
            <Right>
              <Button transparent onPress={onMenuPress}>
                <Icon name='menu' />
              </Button>
            </Right>
    </Header>
    )
  }

}
