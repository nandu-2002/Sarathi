import React, { useState } from "react";
import "./BookingForm.css";
import PickupLocation from "./PickupLocation";

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
  });

  const [submitting, setSubmitting] = useState(false);

  const update = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handlePickup = (pickup) => {
    setForm((prev) => ({
      ...prev,
      pickupLat: pickup.lat,
      pickupLng: pickup.lng,
      pickupAddress: pickup.address,
    }));
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!form.pickupLat || !form.pickupLng) {
      alert("Please select a pickup location!");
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
      });
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={submit} className="card booking-form">
      <h3 style={{ marginTop: 0 }}>Book a Driver</h3>

      <div className="form-row">
        <label>Customer Name</label>
        <input className="input" name="customerName" value={form.customerName} onChange={update} required />
      </div>

      <div className="form-row">
        <label>Phone</label>
        <input className="input" name="phone" value={form.phone} onChange={update} required />
      </div>

      <div className="form-row">
        <label>Pickup Time</label>
        <input className="input" type="datetime-local" name="pickupTime" value={form.pickupTime} onChange={update} required />
      </div>

      <div className="form-row">
        <label>Service Type</label>
        <select className="input" name="serviceType" value={form.service} onChange={update}>
          <option value="hourly">Hourly Driver</option>
          <option value="fullDay">Full Day Driver</option>
          <option value="outstation">Outstation Travel</option>
          <option value="night">Night Shift</option>
          <option value="event">Event Driver</option>
          <option value="airport">Airport Pickup</option>
        </select>
      </div>

      {form.service === "hourly" && (
        <div className="form-row">
          <label>Duration (hours)</label>
          <input className="input" type="number" name="durationHours" min={1} value={form.durationHours} onChange={update} />
        </div>
      )}

      <div className="form-row">
        <label>Pickup Location</label>

        {/* Compact selected address display */}
        {form.pickupAddress && (
          <div
            style={{
              padding: "8px 12px",
              marginBottom: "8px",
              backgroundColor: "#f0f0f0",
              borderRadius: "6px",
              border: "1px solid #ccc",
              fontSize: "0.9rem",
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            <span role="img" aria-label="location">
              📍
            </span>
            <span>{form.pickupAddress}</span>
          </div>
        )}

        <PickupLocation setPickup={handlePickup} />
      </div>

      <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 8 }}>
        <button className="btn btn-primary" type="submit" disabled={submitting}>
          {submitting ? "Booking..." : "Confirm Booking"}
        </button>
      </div>
    </form>
  );
}
