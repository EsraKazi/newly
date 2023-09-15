const { Router } = require('express');
const checkUserRole = require('../middleware/requiredRole');
const { getLogin, postLogin, getSignUp, postSignUp, postLogout } = require('../controllers/authController');
const { getAllReservation } = require('../controllers/reservationController');
const router = Router();

router.get('/', getAllReservation);
router.get('/login', getLogin);
router.post('/login', postLogin);


router.get('/signUp', checkUserRole('management'), getSignUp);
router.post('/signUp', checkUserRole('management'), postSignUp);

router.post('/logout', postLogout);

module.exports = router;
