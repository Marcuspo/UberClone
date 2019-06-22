import React, { Component } from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

export default class Search extends Component {
    render(){
        return <GooglePlacesAutocomplete
            placeholder="Para onde?"
            placeholderTextColor="#333"
            onPress={() => {}}
            query={{
                key: 'AIzaSyDK16zsRyst46t_fEpaltgTN4eqKRHPUTE',
                language: 'pt'
            }}
            textInputProps={{
                autoCapitalaze: "none",
                autoCorrect: false,
            }}
            fetchDetails
            enablePoweredByContainer={false}
        />;
    }
}