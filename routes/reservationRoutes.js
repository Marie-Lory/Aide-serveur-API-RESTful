const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservationController');

router.get('/', reservationController.getAllReservations);
router.post('/', reservationController.createReservation);
router.get('/:idReservation', reservationController.getReservationById);
router.put('/:idReservation', reservationController.updateReservation);
router.patch('/:idReservation', reservationController.patchReservation);
router.delete('/:idReservation', reservationController.deleteReservation);

module.exports = router;