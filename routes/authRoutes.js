const { Router } = require('express');
const { getLogin, postLogin, getSignUp, postSignUp} = require('../controllers/authController');
const router = Router();

router.get("/", getLogin);

router.post("/", postLogin);


router.get("/signUp", getSignUp);

router.post("/signUp", postSignUp);



module.exports = router;