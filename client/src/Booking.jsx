import { useState } from "react";
import { bookSession } from "./api";

function Booking() {
  const [form, setForm] = useState({ name: "", date: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await bookSession(form);
    alert(res.data.message);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Name"
        onChange={(e) => setForm({ ...form, name: e.target.value })} />
      <input type="date"
        onChange={(e) => setForm({ ...form, date: e.target.value })} />
      <button type="submit">Book Now</button>
    </form>
  );
}
export default Booking;
