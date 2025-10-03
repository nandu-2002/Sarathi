import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { useState } from "react";

function LocationMarker({ onLocationSelect }) {
  const [position, setPosition] = useState(null);

  useMapEvents({
    click(e) {
      setPosition(e.latlng);
      onLocationSelect(e.latlng);
    },
  });

  return position === null ? null : <Marker position={position}></Marker>;
}

export default function MapPicker({ onSelect }) {
  return (
    <MapContainer
      center={[28.6139, 77.209]} // default location
      zoom={12}
      style={{ height: "300px", width: "100%", marginTop: "1rem" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <LocationMarker onLocationSelect={onSelect} />
    </MapContainer>
  );
}
