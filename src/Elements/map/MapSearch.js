import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import 'leaflet/dist/leaflet.css';
import 'leaflet-geosearch/dist/geosearch.css';
import './map.css';

const SearchControl = ({ setSearchResult }) => {
  const map = useMap();

  useEffect(() => {
    // Initialize GeoSearch Provider
    const provider = new OpenStreetMapProvider();

    // Initialize the search control
    const searchControl = new GeoSearchControl({
      provider: provider,
      style: 'bar',
      autoClose: false, // Automatically close after selection
      searchLabel: 'Search for a place...',
    });

    // Add the search control to the map
    map.addControl(searchControl);

    // Listen for search results and handle input value
    map.on('geosearch/showlocation', (result) => {
      const  location={x:result.location.x,y:result.location.y,label:result.location.label}
      setSearchResult(location);
      console.log("Search Input Value: ", result.location.label);
    });


    // Cleanup on unmount
    return () => {
      map.removeControl(searchControl);
    };
  }, [map, setSearchResult]);

  return null; // This component does not render anything visible
};

const MapSearch = ({searchResult, setSearchResult}) => {
  // Initial map coordinates and zoom level
  const center = [51.505, -0.09];
  const zoom = 13;
  
  return (
    
     
    <MapContainer center={center} zoom={zoom}>
    <SearchControl setSearchResult={setSearchResult} />
    <TileLayer
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    />
    {/* Display a marker at the search result location */}
    {searchResult && (
      <Marker position={[searchResult.y, searchResult.x]}>
        <Popup>
          {searchResult.label || "Search result location"}
        </Popup>
      </Marker>
    )}
  </MapContainer>
   
  );
};

export default MapSearch;

