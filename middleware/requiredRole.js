const jwt = require("jsonwebtoken");
const { decodeToken } = require("./jwtToken"); // Ensure decodeToken is correctly defined

const checkUserManagement = (requiredRoles) => {
  return (req, res, next) => {
    const user = decodeToken(req);
    if (user) {
      try {
        // Check if the user's role matches any of the required roles
        if (requiredRoles.includes(user.userRole)) {
          next();
        } else {
          // Redirect to the error page if the user doesn't have the required role(s)

          return res.render("error.ejs");
        }
      } catch (error) {
        // Redirect to the error page if an error occurs
        return res.render("error.ejs");
      }
    } else {
      // Redirect to the login page if the user is not authenticated
      return res.redirect("/login");
    }
  };
};

module.exports = checkUserManagement;
