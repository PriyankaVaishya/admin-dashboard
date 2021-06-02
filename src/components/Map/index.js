import React, { Component } from 'react';
import 'leaflet/dist/leaflet.css';
import 'react-leaflet-markercluster/dist/styles.min.css'; 
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';
// import iconPerson from './icon';
import L from 'leaflet';

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import Grid from '@material-ui/core/Grid';

import test from './test.json';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
});

L.Marker.prototype.options.icon = DefaultIcon;

class Maps extends Component {
    constructor(props) {
        super(props);
     
        this.state = {
          refID: "",
        };
      }

      
      render() {
        //const position = [51.505, -0.09];
          return (
            <Grid container spacing={1}>
            <Grid item xs={2}>
            </Grid>
            <Grid item xs={9}>
            <div className="mapHeight">
            <MapContainer center={[30.7333, 76.7794]} zoom={13} scrollWheelZoom={false}>
            <TileLayer
                // attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <MarkerClusterGroup>
            {test.map((row) => (
                <Marker position={[row.longitude, row.latitude]} >
                <Popup>
                    {console.log(row)}
                A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
            </Marker>
            ))}
            {/* <Marker position={[30.7333, 76.7794]} >
                <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
            </Marker>
            <Marker position={[30.7667, 76.7774]} >
                <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
            </Marker>
            <Marker position={[30.7667, 76.7777]} >
                <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
            </Marker>
            <Marker position={[30.7335, 76.7790]} >
                <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
            </Marker> */}
            </MarkerClusterGroup>
            </MapContainer>

            </div>
            </Grid>
            <Grid item xs></Grid>
            </Grid>
          );
      }
}

export default Maps;