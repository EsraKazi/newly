const {Router} = require('express');
const checkUserRole = require('../middleware/requiredRole');
const {  getAllReservation , postNewReservation, updateReservation, updateReservationCallCenter }=require('../controllers/reservationController.js');
const router = Router();


router.get('/', checkUserRole(['callcenter', 'management']), getAllReservation);

router.post('/new', postNewReservation);
router.post('/update/:id', updateReservation);
router.post('/update/:id', updateReservationCallCenter);

module.exports = router;
