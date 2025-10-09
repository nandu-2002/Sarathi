import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "./PickupLocation.css";

// Fix Leaflet marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// Recenter map component
const RecenterMap = ({ position }) => {
  const map = useMap();
  useEffect(() => {
    if (position) map.setView(position, 15);
  }, [position, map]);
  return null;
};

const PickupLocation = ({ setPickup }) => {
  const [position, setPosition] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [predictions, setPredictions] = useState([]);
  const [isFocused, setIsFocused] = useState(false);

  // Reverse geocoding when position changes
  useEffect(() => {
    if (!position) return;

    fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${position.lat}&lon=${position.lng}`
    )
      .then((res) => res.json())
      .then((data) => {
        const address = data.display_name || "Unknown location";
        setPickup({ lat: position.lat, lng: position.lng, address });
        setSearchValue(address);
      })
      .catch((err) => console.error("Reverse geocoding failed:", err));
  }, [position, setPickup]);

  // Autocomplete search
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    if (!value.trim()) return setPredictions([]);

    fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
        value
      )}&addressdetails=1&limit=5`,
      {
        headers: {
          "User-Agent": "SarathiApp/1.0 (your_email@example.com)",
          "Referrer-Policy": "no-referrer",
        },
      }
    )
      .then((res) => res.json())
      .then((data) => setPredictions(data))
      .catch(() => setPredictions([]));
  };

  // Select a prediction
  const handleSelectPrediction = (place) => {
    setPosition({ lat: parseFloat(place.lat), lng: parseFloat(place.lon) });
    setPredictions([]);
    setIsFocused(false);
  };

  // Use current location (working like button version)
  const handleUseCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setPredictions([]);
        setIsFocused(false);
      },
      (err) => {
        console.error("Failed to get location:", err);
        alert("Failed to get current location. Please enable GPS.");
      }
    );
  };

  return (
    <div className="pickup-container">
      {/* Search input */}
      <input
        type="text"
        placeholder="Search for location"
        value={searchValue}
        onChange={handleSearchChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setTimeout(() => setIsFocused(false), 200)}
        className="search-input"
      />

      {/* Dropdown */}
      {isFocused && (
        <ul className="predictions-list">
          {/* 🔹 Use Current Location */}
          <li
            className="use-location-option"
            onMouseDown={(e) => {
              e.preventDefault(); // Prevent input blur
              handleUseCurrentLocation();
            }}
          >
            📍 Use Current Location
          </li>

          {predictions.length > 0 ? (
            predictions.map((p) => (
              <li key={p.place_id} onMouseDown={() => handleSelectPrediction(p)}>
                {p.display_name}
              </li>
            ))
          ) : (
            searchValue && <li className="no-results">No matching locations found</li>
          )}
        </ul>
      )}

      {/* Map */}
      {position && (
        <div className="map-container">
          <MapContainer
            center={position}
            zoom={15}
            scrollWheelZoom={false}
            style={{ height: "300px", width: "100%" }}
          >
            <TileLayer
              attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position}></Marker>
            <RecenterMap position={position} />
          </MapContainer>
        </div>
      )}
    </div>
  );
};

export default PickupLocation;
