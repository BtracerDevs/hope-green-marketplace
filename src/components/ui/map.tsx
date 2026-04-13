"use client";
import React from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  borderRadius: "20px",
};

interface IGoogleMapComponent {
  markers: {
    lat: string;
    lng: string;
  }[];
  zoom: number;
  height: string;
}

const GoogleMapComponent = ({ markers, zoom, height }: IGoogleMapComponent) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyCgwlnL3C4s_WF2pNPA_1Il48hpt_-A6aQ" as string,
  });

  if (!isLoaded) return <div>Loading....</div>;
  return (
    <GoogleMap
      options={{
        mapTypeId: "satellite",
        zoomControl: false,
        disableDoubleClickZoom: true,
        fullscreenControl: false,
        streetViewControl: false,
        mapTypeControl: false,
      }}
      mapContainerStyle={{ ...containerStyle, height }}
      center={{
        lat: Number(markers[0].lat),
        lng: Number(markers[0].lng),
      }}
      zoom={zoom}
    >
      {markers.map((marker, key) => (
        <Marker
          key={key}
          icon={{
            url: "/marker-icon.png",
            scale: 22,
          }}
          position={{
            lat: Number(marker.lat),
            lng: Number(marker.lng),
          }}
        />
      ))}
    </GoogleMap>
  );
};

export default GoogleMapComponent;
