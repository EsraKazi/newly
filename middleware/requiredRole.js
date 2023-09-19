const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY;

const checkUserRole = (requiredRole) => {
  return (req, res, next) => {
    
    const token =req.cookies.jwt;
    if (token) {
        try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        const user = decoded;

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
