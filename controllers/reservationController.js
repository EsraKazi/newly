const Reservation = require('../models/reservationModel')

getAllReservation = (req,res) =>{
    res.render('home');
}


postNewReservation = async (req,res) =>{
   
}

module.exports = {
    getAllReservation,
    postNewReservation
}