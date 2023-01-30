import React, {useState} from 'react'
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import { Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '300px',
  height: '300px',
  
};

const center = {
  lat:  36.663681307811316,
  lng: 4.912543543739743
};

function MyComponent() {
  const [markerPosition, setMarkerPosition] = useState(center);
  const onMapLoad = map => {
    map.addListener('click', e => {
      setMarkerPosition({ lat: e.latLng.lat(), lng: e.latLng.lng() });
    });
  };
  
  return (
    <LoadScript
      googleMapsApiKey="AIzaSyDxxR3cePdRXqOt9ofdaPbYIjJbxqHPOa8"
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
       onLoad={onMapLoad}
      >
   <Marker position={markerPosition} />
      </GoogleMap>
   
  
    </LoadScript>
  )
}

export default React.memo(MyComponent)