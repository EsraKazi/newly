const crypto = require('crypto');
require('dotenv').config(); 
const jwt = require('jsonwebtoken');



process.env.SECRET_KEY = crypto.randomBytes(64).toString('hex');

function generateToken(userData) {
    return jwt.sign(userData, process.env.SECRET_KEY , { expiresIn: '1h' });
}
function deleteToken(res){
    res.cookie('jwt', '', { expires: new Date(0), httpOnly: true, secure: true, sameSite: 'strict' });

}

module.exports = {
    generateToken,
    deleteToken
};