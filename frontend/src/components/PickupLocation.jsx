import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "./PickupLocation.css";

// Fix Leaflet marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// Component to recenter map on new position
const RecenterMap = ({ position }) => {
  const map = useMap();
  useEffect(() => {
    if (position) {
      map.setView(position, 15); // Zoom closer to user location
    }
  }, [position, map]);
  return null;
};

const PickupLocation = ({ setPickup }) => {
  const [position, setPosition] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [predictions, setPredictions] = useState([]);

  
  // Update pickup address automatically
  useEffect(() => {
    if (!position) return;
    fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${position.lat}&lon=${position.lng}`
    )
      .then((res) => res.json())
      .then((data) => {
        setPickup({
          lat: position.lat,
          lng: position.lng,
          address: data.display_name,
        });
        setSearchValue(data.display_name);
      });
  }, [position, setPickup]);

  // Autocomplete search
  const handleSearchChange = (e) => {
  setSearchValue(e.target.value);
  if (!e.target.value) return setPredictions([]);

  fetch(
    `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
      e.target.value
    )}&addressdetails=1&limit=5`,
    {
      headers: {
        "User-Agent": "SarathiApp/1.0 (your_email@example.com)", // required by Nominatim
        "Referrer-Policy": "no-referrer",
      },
    }
  )
    .then((res) => res.json())
    .then((data) => setPredictions(data))
    .catch((err) => {
      console.error("Failed to fetch locations:", err);
      setPredictions([]);
    });
};


  const handleSelectPrediction = (place) => {
    setPosition({ lat: parseFloat(place.lat), lng: parseFloat(place.lon) });
    setPredictions([]);
  };

  const handleUseCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition({ lat: pos.coords.latitude, lng: pos.coords.longitude });
      },
      () => alert("Failed to get current location")
    );
  };

  return (
    <div className="pickup-container">
      <button className="current-location-btn" onClick={handleUseCurrentLocation}>
        Use Current Location
      </button>

      <input
        type="text"
        placeholder="Search for location"
        value={searchValue}
        onChange={handleSearchChange}
        className="search-input"
      />

      {predictions.length > 0 && (
        <ul className="predictions-list">
          {predictions.map((p) => (
            <li key={p.place_id} onClick={() => handleSelectPrediction(p)}>
              {p.display_name}
            </li>
          ))}
        </ul>
      )}

      
      <div className="map-container">
        <MapContainer
          center={position || [10.1632, 76.6413]} // Default to India center
          zoom={position ? 15 : 5}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {position && <Marker position={position} />}
          <RecenterMap position={position} />
        </MapContainer>
      </div>

      {position && (
        <p style={{ fontSize: "0.9rem", marginTop: "4px" }}>
          📍 Selected Address: {searchValue}
        </p>
      )}
    </div>
  );
};

export default PickupLocation;
