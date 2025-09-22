import axios from 'axios';

const API = 'http://localhost:8080/api';

export async function fetchDrivers(){
  const res = await axios.get(API + '/drivers');
  return res.data;
}

export async function createBooking(payload){
  const res = await axios.post(API + '/bookings', payload);
  return res.data;
}
