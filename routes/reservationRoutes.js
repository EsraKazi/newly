const {Router} = require('express');
const checkUserRole = require('../middleware/requiredRole');
const {  getAllReservation , postNewReservation }=require('../controllers/reservationController.js');
const router = Router();

//router.get('/signUp', checkUserRole('management'), getSignUp);

router.get('/', getAllReservation);

router.post('/', postNewReservation);
router.put('/update', checkUserRole('management'), updateReservation);
router.put('/delete', checkUserRole('management'), deleteReservation);

module.exports = router;
