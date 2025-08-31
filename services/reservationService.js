const Reservation = require('../models/reservationModel');

exports.getAllReservationsForCatway = (catwayId) => {
  return Reservation.find({ catway: catwayId });
};

exports.getReservationByIdAndCatway = (reservationId, catwayId) => {
  return Reservation.findOne({ _id: reservationId, catway: catwayId });
};

exports.createReservation = (data) => {
  const reservation = new Reservation(data);
  return reservation.save();
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

exports.deleteReservation = (id) => {
  return Reservation.findByIdAndDelete(id);
};