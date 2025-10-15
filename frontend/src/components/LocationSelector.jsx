import React, { useState, useRef } from "react";
import "./LocationSelector.css";

const LocationSelector = ({ type, setLocation, otherLocation, calculateDistanceAndFare }) => {
  const [searchValue, setSearchValue] = useState("");
  const [predictions, setPredictions] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const timeoutRef = useRef(null);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);

    clearTimeout(timeoutRef.current);
    if (!value.trim()) return setPredictions([]);

    timeoutRef.current = setTimeout(() => {
      fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(value)}&addressdetails=1&limit=5`, {
        headers: {
          "User-Agent": "SarathiApp/1.0 (support@sarathiapp.com)",
          "Referrer-Policy": "no-referrer",
        },
      })
        .then((res) => res.json())
        .then((data) => setPredictions(data))
        .catch(() => setPredictions([]));
    }, 400);
  };

  const handleSelectPrediction = (place) => {
    const location = { lat: parseFloat(place.lat), lng: parseFloat(place.lon), address: place.display_name };
    setSearchValue(place.display_name);
    setPredictions([]);
    setIsFocused(false);
    setLocation(location);

    if (otherLocation?.lat && otherLocation?.lng) {
      calculateDistanceAndFare(
        type === "pickup" ? location : otherLocation,
        type === "drop" ? location : otherLocation
      );
    }
  };

  const handleUseCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`)
          .then((res) => res.json())
          .then((data) => {
            const address = data.display_name || "Current Location";
            const location = { lat: latitude, lng: longitude, address };
            setSearchValue(address);
            setLocation(location);

            if (otherLocation?.lat && otherLocation?.lng) {
              calculateDistanceAndFare(
                type === "pickup" ? location : otherLocation,
                type === "drop" ? location : otherLocation
              );
            }
          })
          .catch(() => alert("Unable to fetch address details."));
      },
      () => alert("Failed to get current location. Please enable GPS.")
    );
  };

  return (
    <div className="pickup-container">
      <div className="form-row pickup-field">
        <span className="location-icon">{type === "pickup" ? "📍" : "🏁"}</span>
        <input
          type="text"
          placeholder=" "
          value={searchValue}
          onChange={handleSearchChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          className="input"
          required
        />
        <label>{type === "pickup" ? "Pickup Location" : "Drop Location"}</label>
      </div>

      {isFocused && (
        <ul className="predictions-list">
          {type === "pickup" && (
            <li
              className="use-location-option"
              onMouseDown={(e) => {
                e.preventDefault();
                handleUseCurrentLocation();
              }}
            >
              📍 Use Current Location
            </li>
          )}
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
    </div>
  );
};

export default LocationSelector;
