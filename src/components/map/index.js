import React, { Component, Fragment } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { View, } from 'react-native';

import Search from '../search';
import Directions from '../Directions';

import markerImage from '../../assets/marker.png';


export default class map extends Component {

    state = {
        region: null,
        destination: null,
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

    handleLocationSelected = (data, { geometry }) => {
        const { location: { lat: latitude, lng: longitude }} = geometry;

        this.setState({
            destination: {
                latitude,
                longitude,
                title: data.structured_formatting.main_text,
            }
        })
    }

  render() {

    const { region, destination } = this.state;

    return (
        <View  style={{ flex: 1 }}> 
            <MapView 
                style={{ flex: 1 }}
                region={region}
                showsUserLocation
                loadingEnabled
                ref={el => this.mapView = el}
            >
                { destination && (
                    <Fragment>
                        <Directions
                            origin={region}
                            destination={destination}
                            onReady={result => {
                                this.mapView.fitToCoordinates(result.coordinates, {
                                    edgePadding: {
                                    right: (50),
                                    left: (50),
                                    top: (50),
                                    bottom: (50)
                                }
                                });
                            }}
                        /> 
                    <Marker 
                        coordinate={destination}
                        anchor={{ x: 0, y: 0 }}
                        image={markerImage}
                    />
                    </Fragment>   
                ) }

            </MapView>

            <Search 
                onLocationSelected={this.handleLocationSelected}
            />
        </View>
    );
  }
}
