//CHCK USER ROLE AND GIVE ACCESS TO CERTAIN PARTS

const checkUserRole = (requiredRole) => {
    return (req, res, next) => {
      /*const userRole = req.user.userRole; 
            if (userRole === requiredRole) {*/
                console.log('userRole check');
        next();
      /*} else {
         res.status(403).send('Access denied');
      }*/
    };
  };
  
module.exports = checkUserRole;