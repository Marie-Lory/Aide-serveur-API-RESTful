const Reservation = require('../models/reservationModel');

// Récupérer les réservations d'un catway par son _id
exports.getReservationsByCatwayId = async (catwayId) => {
  // selon ton modèle, si tes réservations ont un champ catwayNumber ou catway qui référence l'_id
  return Reservation.find({ catwayNumber: Number(catwayId)});
};

exports.getReservationsByCatwayNumber = async (catwayNumber) => {
  const num = Number(catwayNumber);
  if (isNaN(num)) throw new Error("catwayNumber invalide");
  return Reservation.find({ catwayNumber: num });
};

exports.getAllReservationsForCatway = (catwayNumber) => {
  return Reservation.find({ catwayNumber: Number(catwayNumber) });
};

exports.createReservation = (data) => {
  // data.catwayNumber doit être fourni
  return new Reservation(data).save();
};

// Supprimer une réservation par _id et catwayNumber
exports.deleteReservation = (reservationId, catwayNumber) => {
  return Reservation.findOneAndDelete({ _id: reservationId, catwayNumber });
};

exports.updateReservation = (id, data) => {
  if ('createdAt' in data) {
    delete data.createdAt;
  }
  return Reservation.findByIdAndUpdate(id, data, { new: true });
};

exports.patchReservation = (id, data) => {
  if ('createdAt' in data) {
    delete data.createdAt;
  }
  return Reservation.findByIdAndUpdate(id, { $set: data }, { new: true, runValidators: true });
};