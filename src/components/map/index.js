import React, { Component, Fragment } from 'react';
import MapView, { Marker } from 'react-native-maps';
import Geocoder from 'react-native-geocoding';
import { View, } from 'react-native';

import Search from '../search';
import Directions from '../Directions';

Geocoder.init('AIzaSyDK16zsRyst46t_fEpaltgTN4eqKRHPUTE')

import markerImage from '../../assets/marker.png';

import { LocationBox, LocationText, LocationTimeBox, LocationTimeText, LocationTimeTextSMALL } from '../map/styles'


export default class map extends Component {

    state = {
        region: null,
        destination: null,
        duration: null,
    }

    async componentDidMount() {
        navigator.geolocation.getCurrentPosition(
            async ({ coords: { latitude, longitude }}) => {
                const response = await Geocoder.from({ latitude, longitude });
                const address = response.results[0].formatted_address;
                const location = 

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

    const { region, destination, duration } = this.state;

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
                                this.setState({ duration: Math.floor(result.duration) });

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
                    >
                        <LocationBox>
                            <LocationText>{destination.title}</LocationText>
                        </LocationBox>
                    </Marker>

                    <Marker 
                        coordinate={region}
                        anchor={{ x: 0, y: 0 }}
                    >
                        <LocationBox>
                            <LocationTimeBox>
                                <LocationTimeText>{duration}</LocationTimeText>
                                <LocationTimeTextSMALL>MIN</LocationTimeTextSMALL>
                            </LocationTimeBox>
                            <LocationText>Rua 10</LocationText>
                        </LocationBox>
                    </Marker>

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
