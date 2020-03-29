import React, { Component } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid, Typography as MuiTypography } from '@material-ui/core';
import MapContainer from './components/MapContainer';

import {bingSecret, coronaSecret} from './components/secretApiKey';


const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}));

const variants = {
  
  h6: 'This is to add google maps with hotspots'
 
};



//getInfectedCountries();

class Typography extends Component{
  constructor(props){
    super(props);
    this.countriesData = [];
    this.state = {
      isLoaded: false,

    }
  }
  


  componentDidMount(){
    fetch("https://coronavirus-monitor.p.rapidapi.com/coronavirus/cases_by_country.php",{mode: 'cors',
    "method": "GET",
    "headers": {
      "x-rapidapi-host": "coronavirus-monitor.p.rapidapi.com",
		  "x-rapidapi-key": coronaSecret
    }
  })
  .then(responce => responce.json())
  .then(json => {
    json.countries_stat.forEach(data => {
      //console.log(data);
      fetch(`http://dev.virtualearth.net/REST/v1/Locations?countryRegion=${data.country_name}&key=${bingSecret}`)
      .then(responce => responce.json())
      .then(json => {
        //console.log(json);
        try{
          this.countriesData.push({
            deaths: data.deaths,
            cases: data.cases,
            lat: json.resourceSets[0].resources[0].point.coordinates[0],
            lng: json.resourceSets[0].resources[0].point.coordinates[1],
          });
        }
        catch{
          return;
        }

        this.setState({isLoaded: true});
      });
  

    })
  })


  

  }

  render(){

    const {isLoaded} = this.state;
    return(
      <div style={{margin:15 +'px'}}>
      <Grid
        container
        spacing={4}
      >
        {isLoaded ? <MapContainer countriesData={this.countriesData}/> : <p>Loading...</p>}
      </Grid>
    </div>
    );
  }
}





export default Typography;
