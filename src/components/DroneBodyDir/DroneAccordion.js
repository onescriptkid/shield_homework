/*global google*/
import React, { Component } from 'react';
import './DroneBody.css'

import { Accordion, Icon } from 'semantic-ui-react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, Rectangle } from "react-google-maps"
import { MarkerClusterer } from "react-google-maps/lib/components/addons/MarkerClusterer";
import { DrawingManager  } from "react-google-maps/lib/components/drawing/DrawingManager";

import { connect } from 'react-redux';
import { updateFilterLatLng } from '../../actions/logs.js';
const PITTSBURGH = {
  lat: 40.44575,
  lng: -79.98272
}
const MAPS_API_KEY = 'AIzaSyCOe2y73rGX-7EZgOI9BeFZmmang4Q3-Ns';

//https://tomchentw.github.io/react-google-maps/
const MapComponent = withScriptjs(withGoogleMap((props) => {
  const { logs, lat_down, lat_up, lng_left, lng_right } = props;

  const bounds = new google.maps.LatLngBounds(
    new google.maps.LatLng(lat_down, lng_left),
    new google.maps.LatLng(lat_up, lng_right),
  );
  const icon = {
    path: google.maps.SymbolPath.CIRCLE,
    fillColor: '#000',
    fillOpacity: 0.6,
    strokeColor: '#000',
    strokeOpacity: 0.9,
    strokeWeight: 1,
    scale: 6,
    labelOrigin: new google.maps.Point(3, -2)
  }
  const logArr = logs && Object.values(logs);
  // console.log(filters)
  return (
    <GoogleMap
      defaultZoom={8}
      defaultCenter={PITTSBURGH}
    >
      <DrawingManager
        defaultDrawingMode={google.maps.drawing.OverlayType.RECTANGLE}
        onRectangleComplete={e => {
          const convertedBounds = {
            lat_up:e.bounds.f.f,
            lng_right: e.bounds.b.f,
            lat_down: e.bounds.f.b,
            lng_left:e.bounds.b.b
          }
          e.setMap(null);
          props.updateFilterLatLng(convertedBounds)
        }}
        defaultOptions={{
          drawingControl: true,
          drawingControlOptions: {
            position: google.maps.ControlPosition.TOP_CENTER,
            drawingModes: [
              google.maps.drawing.OverlayType.RECTANGLE,
            ],
          },
          circleOptions: {
            fillColor: `#ffff00`,
            fillOpacity: 1,
            strokeWeight: 5,
            clickable: false,
            editable: true,
            zIndex: 1,
          },
        }}
      />
      <Rectangle 
        bounds={bounds}
      />
    <MarkerClusterer
      onClick={props.onMarkerClustererClick}
      averageCenter
      enableRetinaIcons
      gridSize={60}
    >
      {logArr && logArr.map(log => {
        return (
        <Marker
          key={log.id}
          icon={icon}
          position={{ lat: log.lat, lng: log.lng }}
          label={{
            text: "" + log.id,
            fontWeight: "bold"
          }} />
      )})}
    </MarkerClusterer>
          >
    </GoogleMap>
  )
}));

const mapStateToDispatch = (dispatch) => {
  return {
    updateFilterLatLng: (bounds) => dispatch(updateFilterLatLng(bounds)),
  }
}

const mapStateToProps = (state) => {
  return {
    logs: state.logs.logs,
    lat_down: state.logs.filters.lat_down,
    lat_up: state.logs.filters.lat_up,
    lng_left: state.logs.filters.lng_left,
    lng_right: state.logs.filters.lng_right,
  }
}

class DroneAccordion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
    }
  }
  onClick = () => {
    this.setState({ active: !this.state.active })
  }
  render() {
    const { active } = this.state
    const { logs, lat_down, lat_up, lng_left, lng_right } = this.props;
    return (
      <Accordion fluid styled>
        <Accordion.Title active={active} onClick={this.onClick}>
          <Icon name='dropdown' />
          Geofence
        </Accordion.Title>
        <Accordion.Content active={active}>
          <MapComponent
              updateFilterLatLng={this.props.updateFilterLatLng}
              // filters={filters}
              lat_down={lat_down}
              lat_up={lat_up}
              lng_left={lng_left}
              lng_right={lng_right}
              logs={logs}
              googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${MAPS_API_KEY}&v=3.exp&libraries=geometry,drawing,places`}
              loadingElement={<div style={{ height: `100%` }} />}
              containerElement={<div style={{ height: `400px` }} />}
              mapElement={<div style={{ height: `100%` }} />}
          />
        </Accordion.Content>
      </Accordion>
    )
  }
}




export default connect(mapStateToProps, mapStateToDispatch)(DroneAccordion); 