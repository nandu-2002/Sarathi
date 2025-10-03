// utils/geocode.js
export async function reverseGeocode(lat, lng) {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
    );
    if (!response.ok) throw new Error("Failed to fetch address");
    const data = await response.json();
    return data.display_name;
  } catch (error) {
    console.error("Reverse geocode error:", error);
    return null;
  }
}
