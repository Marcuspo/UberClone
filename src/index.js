import React from 'react';
import MapView from 'react-native-maps';

import { View } from 'react-native';

const App = () => 
    (<View  style={{ flex: 1 }}> 
        <MapView 
            style={{ flex: 1 }}
            region={{ 
                latitude: 37.4220,
                longitude: -122.0840,
                longitudeDelta: 0.0143,
                longitudeDelta: 
             }}
        />
    </View>
    );

export default App;
