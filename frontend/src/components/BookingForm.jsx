import React, { useState } from 'react';
import './BookingForm.css'; // <- ensure this path matches your file location

export default function BookingForm({ onSubmit }) {
  const [form, setForm] = useState({
    customerName: '',
    phone: '',
    pickupLocation: '',
    pickupTime: '',
    durationHours: 1
  });

  function update(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  function submit(e) {
    e.preventDefault();
    onSubmit(form);
  }

  return (
    <form onSubmit={submit} className="card booking-form">
      <h3 style={{marginTop:0}}>Book a Driver</h3>

      <div className="form-row">
        <label>Customer Name</label>
        <input className="input" name="customerName" value={form.customerName} onChange={update} required />
      </div>

      <div className="form-row">
        <label>Phone</label>
        <input className="input" name="phone" value={form.phone} onChange={update} required />
      </div>

      <div className="form-row">
        <label>Pickup Location</label>
        <input className="input" name="pickupLocation" value={form.pickupLocation} onChange={update} required />
      </div>

      <div className="form-row">
        <label>Pickup Time</label>
        <input className="input" type="datetime-local" name="pickupTime" value={form.pickupTime} onChange={update} required />
      </div>

      <div className="form-row">
        <label>Duration (hours)</label>
        <input className="input" type="number" name="durationHours" min={1} value={form.durationHours} onChange={update} />
      </div>

      <div style={{display:'flex', justifyContent:'flex-end', marginTop:8}}>
        <button className="btn btn-primary" type="submit">Confirm Booking</button>
      </div>
    </form>
  );
}
