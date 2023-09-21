const { Router } = require('express');
const checkUserRole = require('../middleware/requiredRole');
const { getLogin, postLogin, getSignUp, postSignUp, getLogout } = require('../controllers/authController');
const router = Router();


router.get('/login', getLogin);
router.post('/login', postLogin);


router.get('/signUp', checkUserRole('management'), getSignUp);
router.post('/signUp', checkUserRole('management'), postSignUp);

router.get('/logout', getLogout);

module.exports = router;
