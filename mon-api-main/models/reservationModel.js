const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  catwayNumber: {
    type: Number,
    required: [true, 'Un numéro de catway est requis'],
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  guests: {
    type: Number,
    default: 1
  },
  clientName: {             // champs supplémentaires existants
    type: String,
  },
  boatName: {
    type: String,
  }
}, { timestamps: true });

module.exports = mongoose.model('Reservation', reservationSchema);