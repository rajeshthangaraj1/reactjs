/* global google */
import {
  default as React,
  Component,
} from "react";

import {
  withGoogleMap,
  GoogleMap,
  InfoWindow,
  Marker
} from "react-google-maps/lib";

  
const PopUpInfoWindowExampleGoogleMap = withGoogleMap(props => (
  <GoogleMap
    defaultZoom={5}
    center={props.center}
  >
    {props.markers.map((marker, index) => (
      <Marker
        key={index}
        position={marker.position}
        onClick={() => props.onMarkerClick(marker)}
      >
        {/*
          Show info window only if the 'showInfo' key of the marker is true.
          That is, when the Marker pin has been clicked and 'onCloseClick' has been
          Successfully fired.
        */}
        {marker.showInfo && (
          <InfoWindow onCloseClick={() => props.onMarkerClose(marker)}>
            <div>{marker.infoContent}</div>
          </InfoWindow>
        )}
      </Marker>
    ))}
  </GoogleMap>
));

/*
 *
 *  Add <script src="https://maps.googleapis.com/maps/api/js"></script>
 *  to your HTML to provide google.maps reference
 *
 *  @author: @chiwoojo
 */
export default class PopUpInfoWindowExample extends Component {

  state = {
    center: {
      lat: 1.290270,
      lng: 103.851959,
    }
  };

  handleMarkerClick = this.handleMarkerClick.bind(this);
  handleMarkerClose = this.handleMarkerClose.bind(this);
  
   
  // Toggle to 'true' to show InfoWindow and re-renders component
  handleMarkerClick(targetMarker) {
	  
    this.setState({
      markers: this.props.markers.map(marker => {
        if (marker === targetMarker) {
          return {
            ...marker,
            showInfo: true,
          };
        }
        return marker;
      }),
    });
  }
	
  handleMarkerClose(targetMarker) {
    this.setState({
      markers: this.props.markers.map(marker => {
        if (marker === targetMarker) {
          return {
            ...marker,
            showInfo: false,
          };
        }
        return marker;
      }),
    });
  }

  render() {
    return (
      <PopUpInfoWindowExampleGoogleMap
        containerElement={
          <div style={{width: 625, height: 500}} />
        }
        mapElement={
          <div style={{ height: `100%` }} />
        }
        center={this.state.center}
        markers={this.props.markers}
        onMarkerClick={this.handleMarkerClick}
        onMarkerClose={this.handleMarkerClose}
      />
    );
  }
}
