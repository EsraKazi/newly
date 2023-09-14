const { Router } = require('express');
const { getLogin, postLogin, getSignUp, postSignUp, postLogout} = require('../controllers/authController');
const router = Router();

router.get("/", getLogin);

router.post("/", postLogin);


router.get("/signUp", getSignUp);

router.post("/signUp", postSignUp);

router.post("/logout", postLogout);



module.exports = router;