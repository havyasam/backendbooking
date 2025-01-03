let bookings = []; // In-memory store for bookings

// Get all bookings
const getBookings = () => {
  return bookings;
};

// Add a new booking
const addBooking = (newBooking) => {
  bookings.push(newBooking);
};

// Delete a booking by ID
const deleteBooking = (id) => {
  const index = bookings.findIndex((booking) => booking.id === id);
  if (index !== -1) {
    bookings.splice(index, 1);
    return true;
  }
  return false; // Return false if the booking was not found
};

module.exports = { getBookings, addBooking, deleteBooking };
