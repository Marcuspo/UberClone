import React, { Component } from 'react';
import MapView from 'react-native-maps';
import { View } from 'react-native';

import Search from '../search';

export default class map extends Component {

    state = {
        region: null,
    }

    async componentDidMount() {
        navigator.geolocation.getCurrentPosition(
            ({ coords: { latitude, longitude }}) => {
                this.setState({ region: { latitude, longitude, longitudeDelta: 0.0143, latitudeDelta: 0.0134 } })
            },
            () => {},
            {
                timeout: 2000,
                enableHighAccuracy: true,
                maximumAge: 1000,
            }
        )
    }

  render() {

    const { region } = this.state;

    return (
        <View  style={{ flex: 1 }}> 
            <MapView 
                style={{ flex: 1 }}
                region={region}
                showsUserLocation
                loadingEnabled
            />

            <Search />
        </View>
    );
  }
}
