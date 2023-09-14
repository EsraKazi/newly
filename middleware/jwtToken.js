const crypto = require('crypto');
require('dotenv').config(); 
const jwt = require('jsonwebtoken');


const secretKey = crypto.randomBytes(32).toString('hex');
process.env.SECRET_KEY = secretKey;

function generateToken(userData) {
    return jwt.sign(userData, secretKey, { expiresIn: '1h' });
}

module.exports = {
    generateToken,
    secretKey,
};