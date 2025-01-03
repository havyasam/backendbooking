const express = require("express");
const { getBookings, addBooking, deleteBooking } = require("../models/Booking");
const router = express.Router();
const { v4: uuidv4 } = require("uuid"); // For unique IDs

// Get all bookings
router.get("/", (req, res) => {
  const bookings = getBookings();
  console.log("Current bookings:", bookings); // Debug log
  res.json(bookings);
});

// Create a booking
router.post("/", (req, res) => {
  const { date, time, guests, name, contact } = req.body;
  if (!date || !time || !guests || !name || !contact) {
    return res.status(400).json({ error: "All fields are required." });
  }

  const newBooking = { id: uuidv4(), date, time, guests, name, contact };
  addBooking(newBooking);
  console.log("New booking added:", newBooking); // Debug log
  res.status(201).json(newBooking);
});

// Delete a booking
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  console.log(`Deleting booking with ID: ${id}`); // Debug log

  const isDeleted = deleteBooking(id);
  if (!isDeleted) {
    return res.status(404).json({ error: "Booking not found." });
  }

  res.status(200).json({ message: "Booking deleted." });
});

module.exports = router;
