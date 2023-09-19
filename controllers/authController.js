const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwtToken = require('../middleware/jwtToken');
require("dotenv").config();

getLogin = (req,res) =>{
    res.render('login');
}


postLogin = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username});

        if (!user) {
            console.log("user not found");
            return res.redirect('/login');
        }
        const userRole = user.userRole;
        const matched = await bcrypt.compare(password, user.password);
        if (!matched) {
            console.log("password no match");
            return res.redirect('/login');
        }
        const token = jwtToken.generateToken({
            username,
            userRole
        });
  
        res.cookie('jwt', token);
        
        res.redirect('/');
    } catch (error) {
        console.error('Unable to login:', error);
        res.status(500).send('Unable to login');
    }
};

getSignUp = (req, res) => {
    res.render('signUp');
};


postSignUp = async (req,res) =>{

    try {
    const hashedPassword = await bcrypt.hash(req.body.password,await bcrypt.genSalt());
    const user = await (new User({
        username : req.body.username,
        password : hashedPassword,
        userRole : req.body.userRole
    })).save();
    return res.redirect('/signUp');
} catch (error) {
    console.error('Error:', error);
}
};

getLogout = ('/logout', (req, res) => {
    jwtToken.deleteToken(res);
       res.redirect('/login');
  });
  

module.exports = {
    getLogin,
    postLogin,
    getSignUp,
    postSignUp,
    getLogout

}