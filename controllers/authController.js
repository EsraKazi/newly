const User = require('../models/userModel');
const bcrypt = require('bcrypt');

getLogin = (req,res) =>{
    res.render('login');
}


postLogin = async (req,res) =>{
    const {email} = req.body;
    res.send('login');
}

getSignUp = (req,res) =>{
    res.render('login');
}
postSignUp = ('/signUp',async (req,res) =>{

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

})

module.exports = {
    getLogin,
    postLogin,
    getSignUp,
    postSignUp
}