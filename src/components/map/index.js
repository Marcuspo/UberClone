import React, { Component, Fragment } from 'react';
import MapView, { Marker } from 'react-native-maps';
import Geocoder from 'react-native-geocoding';
import { View, Image } from 'react-native';

import Search from '../search';
import Directions from '../Directions';
import Details from '../Details';

import markerImage from '../../assets/marker.png';
import backImage from '../../assets/back.png';

import {
    Back, 
    LocationBox, 
    LocationText, 
    LocationTimeBox, 
    LocationTimeText, 
    LocationTimeTextSMALL 
} from '../map/styles'

Geocoder.init('AIzaSyDK16zsRyst46t_fEpaltgTN4eqKRHPUTE');

export default class map extends Component {

    state = {
        region: null,
        destination: null,
        duration: null,
        location: null,
    }

    async componentDidMount() {
        navigator.geolocation.getCurrentPosition(
            async ({ coords: { latitude, longitude }}) => {
                const response = await Geocoder.from({ latitude, longitude });
                const address = response.results[0].formatted_address;
                const location = address.substring(0, address.indexOf(','));

                this.setState({ 
                    location,
                    region: { 
                        latitude, longitude, 
                        longitudeDelta: 0.0143, 
                        latitudeDelta: 0.0134 
                    } 
                })
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

    handleBack = () => {
        this.setState({ destination: null });
     }

  render() {

    const { region, destination, duration, location } = this.state;

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
                                    bottom: (350)
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
                            <LocationText>{location}</LocationText>
                        </LocationBox>
                    </Marker>

                    </Fragment>   
                ) }

            </MapView>
            
            { destination ? (
            <Fragment>
                <Back onPress={this.handleBack}>
                    <Image source={backImage} />
                </Back>
                <Details />
            </Fragment>
            ) : ( 
                <Search onLocationSelected={this.handleLocationSelected} /> )}
        </View>
    );
  }
}
