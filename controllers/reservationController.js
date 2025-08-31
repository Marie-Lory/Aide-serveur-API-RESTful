const reservationService = require("../services/reservationService");

exports.getAllReservations = async (req, res) => {
  try {
    const catwayId = req.params.id;
    const reservations = await reservationService.getAllReservationsForCatway(catwayId);
    res.json(reservations);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
};

exports.getReservationById = async (req, res) => {
  try {
    const catwayId = req.params.id;
    const reservationId = req.params.idReservation;
    const reservation = await reservationService.getReservationByIdAndCatway(reservationId, catwayId);
    if (!reservation) return res.status(404).json({ message: "Réservation introuvable" });
    res.json(reservation);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
};

exports.createReservation = async (req, res) => {
  try {
    const catwayId = req.params.id;
    const data = { ...req.body, catway: catwayId };
    const reservation = await reservationService.createReservation(data);
    res.status(201).json(reservation);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.createReservation = async (req, res) => { 
    try { 
      const catwayId = req.params.id; 
      if (!catwayId) { 
        return res.status(400).json({ message: "Catway id manquant dans l'URL" }); 
    }

    const body = req.body || {};

    // Appliquer des valeurs par défaut si nécessaire
    const data = {
      ...body,
      catway: catwayId,
      guests: (body.guests != null) ? body.guests : 1,
      // optionnel: vous pouvez imposer ou defaults pour startDate/endDate si besoin
      // startDate: body.startDate ? new Date(body.startDate) : undefined,
      // endDate: body.endDate ? new Date(body.endDate) : undefined,
    };

// Optionnel: si startDate/endDate obligatoires, vérifiez-les ici
// if (!data.startDate || !data.endDate) { return res.status(400).json({ message: "startDate et endDate sont obligatoires" }); }

    const reservation = await reservationService.createReservation(data);
    res.status(201).json(reservation);
    } catch (err) { 
        res.status(400).json({ message: err.message }); 
    } 
};

exports.updateReservation = async (req, res) => {
  const catwayId = req.params.id;
  const reservationId = req.params.idReservation;
  const data = req.body;
  try {
    const existing = await reservationService.getReservationByIdAndCatway(reservationId, catwayId);
    if (!existing) return res.status(404).json({ message: "Réservation introuvable" });
    const updated = await reservationService.updateReservation(reservationId, data);
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
};

exports.patchReservation = async (req, res) => {
  const catwayId = req.params.id;
  const reservationId = req.params.idReservation;
  const data = req.body;
  try {
    const existing = await reservationService.getReservationByIdAndCatway(reservationId, catwayId);
    if (!existing) return res.status(404).json({ message: "Réservation introuvable" });
    const updated = await reservationService.patchReservation(reservationId, data);
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
};

exports.deleteReservation = async (req, res) => {
  const catwayId = req.params.id;
  const reservationId = req.params.idReservation;
  try {
    const existing = await reservationService.getReservationByIdAndCatway(reservationId, catwayId);
    if (!existing) return res.status(404).json({ message: "Réservation introuvable" });
    await reservationService.deleteReservation(reservationId);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
};