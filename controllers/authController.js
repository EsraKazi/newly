const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwtToken = require('../middleware/jwtToken');
const checkUserRole = require('../middleware/requiredRole');
require("dotenv").config();

getLogin = (req,res) =>{
    res.render('login');
}


postLogin = async (req, res) => {
    
    console.log('postLogin');
    try {
        console.log('try');
        const { username, password } = req.body;
        console.log(username);
        const user = await User.findOne({ username });

        if (!user) {
            console.log("user not found");
            return res.redirect('/');
        }

        const matched = await bcrypt.compare(password, user.password);
        if (!matched) {
            console.log("password no match");
            return res.redirect('/');
        }

        console.log('cookie');
        const token = jwtToken.generateToken({username,password});
  
        res.cookie('jwt', token);
        console.log('logged in');
        
        res.redirect('/');
    } catch (error) {
        console.error('Unable to login:', error);
        res.status(500).send('Unable to login');
    }
};

getSignUp = ('/signUp', checkUserRole('Mng'),(req, res) => {
    res.render('login');
});


postSignUp = ('/signUp',  checkUserRole('Mng'),async (req,res) =>{

    try {
    const hashedPassword = await bcrypt.hash(req.body.password,await bcrypt.genSalt());
    const user = await (new User({
        username : req.body.username,
        password : hashedPassword,
        userRole : req.body.userRole
    })).save();
    return res.redirect('/');
}
    catch(err){
        console.log('Error.')
    }
    

});

postLogout = ('/logout', (req, res) => {
    res.cookie('jwt', '', { expires: new Date(0), httpOnly: true, secure: true, sameSite: 'strict' });
    res.redirect('/');
  });
  

module.exports = {
    getLogin,
    postLogin,
    getSignUp,
    postSignUp,
    postLogout

}