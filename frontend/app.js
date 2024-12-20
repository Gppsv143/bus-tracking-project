
import React, { useState, useEffect } from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { io } from "socket.io-client";

const socket = io("http://YOUR_BACKEND_IP:3001");

const mapStyles = {
  width: "100vw",
  height: "100vh",
};

const defaultCenter = { lat: 12.9716, lng: 77.5946 };

export default function App() {
  const { isLoaded } = useLoadScript({ googleMapsApiKey: "YOUR_API_KEY" });
  const [buses, setBuses] = useState([]);

  useEffect(() => {
    socket.on("busLocationUpdate", (data) => {
      setBuses(data);
    });

    return () => socket.off("busLocationUpdate");
  }, []);

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <GoogleMap mapContainerStyle={mapStyles} center={defaultCenter} zoom={12}>
      {buses.map((bus, index) => (
        <Marker key={index} position={bus.location} label={bus.number} />
      ))}
    </GoogleMap>
  );
}
