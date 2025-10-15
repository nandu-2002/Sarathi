import React, { useState } from "react";
import "./BookingForm.css";
import LocationSelector from "./LocationSelector";
import axios from "axios";

const ORS_API_KEY = "eyJvcmciOiI1YjNjZTM1OTc4NTExMTAwMDFjZjYyNDgiLCJpZCI6IjlmNmZiOWRjOGFhMjQ1YjhhMmYwY2EzYzJiM2U5NWYyIiwiaCI6Im11cm11cjY0In0="; // Replace with your ORS API key

export default function BookingForm({ onSubmit }) {
  const [form, setForm] = useState({
    customerName: "",
    phone: "",
    pickupTime: "",
    service: "hourly",
    durationHours: 1,
    pickupLat: null,
    pickupLng: null,
    pickupAddress: "",
    dropLat: null,
    dropLng: null,
    dropAddress: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [distanceKm, setDistanceKm] = useState(null);
  const [estimatedFare, setEstimatedFare] = useState(null);

  const update = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const calculateDistanceAndFare = async (pickup, drop) => {
  if (!pickup || !drop) return;

  try {
    const response = await axios.post(
      "https://api.openrouteservice.org/v2/directions/driving-car",
      {
        coordinates: [
          [pickup.lng, pickup.lat],
          [drop.lng, drop.lat],
        ],
      },
      {
        headers: {
          Authorization: ORS_API_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    const distanceMeters = response.data?.routes?.[0]?.summary?.distance;

    if (!distanceMeters) {
      console.error("No distance returned by ORS API", response.data);
      setDistanceKm(null);
      setEstimatedFare(null);
      return;
    }

    const km = (distanceMeters / 1000).toFixed(2);
    setDistanceKm(km);
    setEstimatedFare((km * 15).toFixed(0)); // ₹15 per km
  } catch (err) {
    console.error("Error fetching route:", err);
    setDistanceKm(null);
    setEstimatedFare(null);
  }
};


  const handlePickup = (pickup) => {
    setForm((prev) => ({
      ...prev,
      pickupLat: pickup.lat,
      pickupLng: pickup.lng,
      pickupAddress: pickup.address,
    }));

    if (form.dropLat && form.dropLng) {
      calculateDistanceAndFare(pickup, { lat: form.dropLat, lng: form.dropLng });
    }
  };

  const handleDrop = (drop) => {
    setForm((prev) => ({
      ...prev,
      dropLat: drop.lat,
      dropLng: drop.lng,
      dropAddress: drop.address,
    }));

    if (form.pickupLat && form.pickupLng) {
      calculateDistanceAndFare({ lat: form.pickupLat, lng: form.pickupLng }, drop);
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!form.pickupLat || !form.pickupLng) {
      alert("Please select a pickup location!");
      return;
    }
    if (!form.dropLat || !form.dropLng) {
      alert("Please select a drop location!");
      return;
    }

    setSubmitting(true);
    try {
      await onSubmit(form);
      setForm({
        customerName: "",
        phone: "",
        pickupTime: "",
        service: "hourly",
        durationHours: 1,
        pickupLat: null,
        pickupLng: null,
        pickupAddress: "",
        dropLat: null,
        dropLng: null,
        dropAddress: "",
      });
      setDistanceKm(null);
      setEstimatedFare(null);
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={submit} className="card booking-form">
      <h3>Book a Driver</h3>

      <div className="form-row">
        <input className="input" name="customerName" value={form.customerName} onChange={update} placeholder="" required />
        <label>Customer Name</label>
      </div>

      <div className="form-row">
        <input className="input" name="phone" value={form.phone} onChange={update} placeholder="" required />
        <label>Phone</label>
      </div>

      <div className="form-row">
        <input className="input" type="datetime-local" name="pickupTime" value={form.pickupTime} placeholder="" onChange={update} required />
        <label>Pickup Time</label>
      </div>

      <div className="form-row">
        <select className="input" name="service" value={form.service} onChange={update}>
          <option value="hourly">Hourly Driver</option>
          <option value="fullDay">Full Day Driver</option>
          <option value="outstation">Outstation Travel</option>
          <option value="night">Night Shift</option>
          <option value="event">Event Driver</option>
          <option value="airport">Airport Pickup</option>
        </select>
        <label>Service Type</label>
      </div>

      {form.service === "hourly" && (
        <div className="form-row">
          <input className="input" type="number" name="durationHours" min={1} value={form.durationHours} onChange={update} />
          <label>Duration (hours)</label>
        </div>
      )}

      <LocationSelector
        type="pickup"
        setLocation={handlePickup}
        otherLocation={{ lat: form.dropLat, lng: form.dropLng }}
        calculateDistanceAndFare={calculateDistanceAndFare}
      />
      <LocationSelector
        type="drop"
        setLocation={handleDrop}
        otherLocation={{ lat: form.pickupLat, lng: form.pickupLng }}
        calculateDistanceAndFare={calculateDistanceAndFare}
      />

      {distanceKm && estimatedFare && (
        <div className="fare-display">
          <p>Distance: {distanceKm} km</p>
          <p>Estimated fare: ₹{estimatedFare}</p>
        </div>
      )}

      <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 8 }}>
        <button className="btn btn-primary" type="submit" disabled={submitting}>
          {submitting ? "Booking..." : "Confirm Booking"}
        </button>
      </div>
    </form>
  );
}
