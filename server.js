const express = require("express");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");

const app = express();
app.use(express.json());
app.use(cors());

let bookings = [];

// Create a new booking
app.post("/api/bookings", (req, res) => {
  try {
    const { date, time, guests, name, contact } = req.body;

    if (!date || !time || !guests || !name || !contact) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const booking = { id: uuidv4(), date, time, guests, name, contact };
    bookings.push(booking);

    res.status(201).json({ message: "Booking successful!", booking });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get all bookings
app.get("/api/bookings", (req, res) => {
  res.status(200).json(bookings);
});

// Delete a booking
app.delete("/api/bookings/:id", (req, res) => {
  const { id } = req.params;
  const index = bookings.findIndex((b) => b.id === id);

  if (index !== -1) {
    bookings.splice(index, 1);
    return res.status(200).json({ message: "Booking deleted successfully!" });
  }

  res.status(404).json({ error: "Booking not found!" });
});

// Start server
app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
