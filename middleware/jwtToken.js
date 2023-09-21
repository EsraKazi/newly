const crypto = require('crypto');
const jwt = require('jsonwebtoken');
require('dotenv').config(); 

function decodeToken(req){
    try {
        const token = req.cookies.jwt;
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        const user = decoded;
        return user;
    } catch (error) {
        console.error('Token decoding error:', error);
        return '/login'; // Return the '/login' URL in case of an error
    }
}

process.env.SECRET_KEY = crypto.randomBytes(64).toString('hex');

function generateToken(userData) {
    return jwt.sign(userData, process.env.SECRET_KEY, { expiresIn: '1h' });
}

function deleteToken(res){
    res.cookie('jwt', '', { expires: new Date(0), httpOnly: true, secure: true, sameSite: 'strict' });
}

module.exports = {
    generateToken,
    decodeToken,
    deleteToken
};
