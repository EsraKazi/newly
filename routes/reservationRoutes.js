const {Router} = require('express');
const checkUserRole = require('../middleware/requiredRole');
const {  getAllReservation , postNewReservation, updateReservation }=require('../controllers/reservationController.js');
const router = Router();
router.get('/', getAllReservation);

router.post('/new', postNewReservation);
router.put('/update/:id', checkUserRole('management'), updateReservation);

module.exports = router;
