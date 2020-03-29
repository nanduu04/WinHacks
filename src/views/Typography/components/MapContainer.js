import React, {Component} from 'react';
import {Map, GoogleApiWrapper, InfoWindow, Marker} from 'google-maps-react';

import {googleSecret} from './secretApiKey';

const mapStyles = {
    width: '100%',
    height: '100%'
};


export class MapContainer extends Component{
    constructor(props){
        super(props);
        this.countriesData = [];
    }
    state={
        showingInfoWindow: false,
        activeMarker: {},
        selectedPlace: {},
        data: {}
    };


    onMarkerClick = (props, marker, e) => {
        this.setState({
            showingInfoWindow: true,
            selectedPlace: props,
            activeMarker: marker,
            data: props.data
        });

    }

        
//
    onClose = props => {
        if(this.state.showingInfoWindow){
            this.setState({
                showingInfoWindow: false,
                activeMarker: null,
                
            });
        }
    };

    render(){
        
        const countryData = this.props.countriesData;
        

        return(
            <Map
                google={this.props.google}
                zoom={1}
                style={mapStyles}
                initialCenter={{
                    lat: 55.585901,
                    lng: -105.750596
                }}
            >
                {countryData.map(data => <Marker onClick={this.onMarkerClick} data = {data} position={{lat: data.lat, lng: data.lng}}/>)}
                <InfoWindow
                    marker={this.state.activeMarker}
                    visible={this.state.showingInfoWindow}
                    onClose={this.onClose}>
                        <div>
                            <p>Deaths: {this.state.data.deaths}</p>
                            <p>Cases: {this.state.data.cases}</p>
                        </div>
                </InfoWindow>
                
            </Map>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: googleSecret
})(MapContainer);