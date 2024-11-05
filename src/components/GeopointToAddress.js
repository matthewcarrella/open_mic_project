import React, { useState, useEffect } from 'react';
import { setKey, setDefaults, fromLatLng } from 'react-geocode';

const GOOGLE_MAPS_API_KEY = process.env.REACT_APP_GEOCODE_API_KEY;
setKey(GOOGLE_MAPS_API_KEY);

function GeopointToAddress({ geopoint }) {
  const [address, setAddress] = useState('');

  useEffect(() => {
      fromLatLng(geopoint.latitude, geopoint.longitude).then((response) => {
             const formattedAddress = response.results[0].formatted_address;
        const addressComponents = response.results[0].address_components;
 

        // Filter out country and zip code components
        const filteredComponents = addressComponents.filter(
          (component) => !['country', 'postal_code', 'administrative_area_level_3', 'administrative_area_level_2', 'postal_code_suffix'].includes(component.types[0])
        );

        // Construct the address string without country and zip code
        const filteredAddress = filteredComponents.map((component) => component.long_name).join(', ');

        setAddress(filteredAddress);
      },
      (error) => {
        console.error(error);
      }
    );
  }, [geopoint]);

  return (
    <div>
      {address ? address : 'Loading...'}
    </div>
  );
}

export default GeopointToAddress;