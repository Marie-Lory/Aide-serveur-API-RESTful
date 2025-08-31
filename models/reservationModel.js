const mongoose = require('mongoose');

const ReservationSchema = new mongoose.Schema({ 
    // référence du catway associé 
    catway: { type: mongoose.Schema.Types.ObjectId, ref: 'Catway', required: true },

    // autres champs de réservation (à adapter) 
    startDate: { type: Date, required: true }, endDate: { type: Date, required: true }, guests: { type: Number, required: true, default: 1 },

    // éventuels autres champs }, 
},  { timestamps: true });

module.exports = mongoose.model('Reservation', ReservationSchema);
