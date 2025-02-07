const mongoose = require("mongoose");

const flightSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  createdAt: { type: Date, required: true },
  airline: { type: String, required: true },
  arrival_airport: { type: String, required: true },
  departure_airport: { type: String, required: true },
  date: { type: String, required: true },
  flight_number: { type: String, required: true },
  gate: { type: String, required: true },
  terminal: { type: String, required: true },
  baggage_belt: { type: String, required: true },
  arrival_time: { type: Date, required: true },
  departure_time: { type: Date, required: true },
  chat_roomId: { 
    type: String, 
    required: true, 
    unique: true,
    default: function() {
      return `${this.flight_number}_${this.date}`.replace(/\s+/g, '_');
    }
  },
});

module.exports = mongoose.model("Flight", flightSchema);
