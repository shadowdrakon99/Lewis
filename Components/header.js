import React, { Component } from 'react';
import { Header, Left, Body, Right, Container, Icon, Button, Title } from 'native-base';

export default class extends Component {

  render() {
    return(
      <Header>
            <Left>
              <Button transparent>
                <Icon name='arrow-back' />
              </Button>
            </Left>
            <Body>
              <Title>Lewis Model</Title>
            </Body>
            <Right>
              <Button transparent>
                <Icon name='menu' />
              </Button>
            </Right>
    </Header>
    )
  }

}
