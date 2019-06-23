import React from 'react';
import MapViewDirections from 'react-native-maps-directions';

const directions = (destination, origin, onReady) => (
    <MapViewDirections 
        destination= {destination}
        origin={origin}
        onReady={onReady}
        apikey="AIzaSyDK16zsRyst46t_fEpaltgTN4eqKRHPUTE"
        strokeWidth={3}
        strokeColor="#222"
    />);

export default directions;
