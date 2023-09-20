const jwt = require('jsonwebtoken');
const { decodeToken } = require('./jwtToken');
const secretKey = process.env.SECRET_KEY;

const checkUserRole = (requiredRole) => {
  return (req, res, next) => {
    
    const user = decodeToken(req);
    if (user) {
        try {

        if (user.userRole === requiredRole) {
            next();
        } else {
            return res.status(403).render('error.ejs');
        }
        } catch (error) {
          return res.status(403).render('error.ejs');
        }
    } else {
        return res.status(401).redirect('/login');
    }

  };
}







module.exports = checkUserRole;
