const catwayService = require('../services/catwayService');
const reservationService = require('../services/reservationService');

exports.createReservation = async (req, res) => {
  try {
    const catwayNumber = Number(req.params.id);

    const reservation = await reservationService.createReservation({
      catwayNumber,                 // <- numéro du catway
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      guests: req.body.guests ?? 1,
      clientName: req.body.clientName,
      boatName: req.body.boatName
    });

    res.status(201).json(reservation);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getAllReservations = async (req, res) => {
  try {
    const catwayNumber = Number(req.params.id); // converti en Number
    if (isNaN(catwayNumber)) {
      return res.status(400).json({ message: "catwayNumber invalide" });
    }

    const reservations = await reservationService.getReservationsByCatwayNumber(catwayNumber);
    res.json(reservations);
  } catch (err) {
    console.error("Erreur getAllReservations:", err);
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
};

exports.getReservationById = async (req, res) => {
  try {
    const catwayNumber = Number(req.params.id);

    const reservation = await reservationService.getReservationByIdAndCatway(
      req.params.idReservation,
      catwayNumber
    );

    if (!reservation) {
      return res.status(404).json({ message: "Réservation introuvable" });
    }

    res.json(reservation);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateReservation = async (req, res) => {
  try {
    const catwayNumber = Number(req.params.id);

    const reservation =
      await reservationService.getReservationByCatwayNumber(catwayNumber);

    if (!reservation) {
      return res.status(404).json({ message: "Réservation introuvable" });
    }

    const updated = await reservationService.updateReservation(
      reservation._id,
      req.body
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({
      message: "Erreur serveur",
      error: err.message
    });
  }
};

exports.patchReservation = async (req, res) => {
  try {
    const catwayNumber = Number(req.params.id);
    const reservationId = req.params.idReservation;

    const catway = await catwayService.getCatwayByNumber(catwayNumber);
    if (!catway) return res.status(404).json({ message: "Catway introuvable" });

    const existing = await reservationService.getReservationByIdAndCatway(reservationId, catway._id);
    if (!existing) return res.status(404).json({ message: "Réservation introuvable" });

    const updated = await reservationService.patchReservation(reservationId, req.body);
    res.json(updated);
  } catch (err) {
      console.error("❌ ERREUR RESERVATION :", err);
      res.status(500).json({
        message: "Erreur serveur",
        error: err.message,
        stack: err.stack
      });
    }
};

// DELETE /catways/:id/reservations/:idReservation
exports.deleteReservation = async (req, res) => {
  try {
    const catwayNumber = Number(req.params.id);
    const reservationId = req.params.idReservation;

    if (!reservationId) return res.status(400).json({ message: "reservationId manquant" });

    const reservation = await reservationService.deleteReservation(reservationId, catwayNumber);

    if (!reservation) return res.status(404).json({ message: "Réservation introuvable" });

    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};