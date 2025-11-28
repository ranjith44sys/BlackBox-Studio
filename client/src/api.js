import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000",
});

// Booking API (already exists)
export const bookSession = (data) => API.post("/booking/create", data);

// CONTACT FORM API (NEW)
export const sendContactMessage = (data) => API.post("/contact/", data);
