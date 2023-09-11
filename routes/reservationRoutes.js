const {Router} = require('express');
const {  getAllReservation , postNewReservation }=require('../controllers/reservationController.js');
const router = Router();

router.get('/', getAllReservation);

router.post('/', postNewReservation);

module.exports = router;
