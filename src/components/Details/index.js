import React, { Component } from 'react';

import { Container, TypeTitle, TypeDescription, TypeImage, RequestButton, RequestButtonText } from './styles';

import UberX from '../../assets/uberx.png';

export default class Details extends Component {
  render() {
    return <Container>
        <TypeTitle>Popular</TypeTitle>
        <TypeDescription>Viagens baratas para o dia a dia</TypeDescription>

        <TypeImage source={UberX}  />
        <TypeTitle>UberX</TypeTitle>
        <TypeDescription>R$15,00</TypeDescription>

        <RequestButton onPress={() => {} }>
        <RequestButtonText>SOLICITAR UBERX</RequestButtonText>
        </RequestButton>
    </Container>;
  }
}
