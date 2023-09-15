const Reservation = require('../models/reservationModel')

getAllReservation = ('/',async (req, res) => {
    try {
        var reservation = await Reservation.find();
        res.render('home.ejs',{
            reservationData: reservation
        })
    } catch (error) {
        res.redirect('/');
        
    }
})


postNewReservation = async (req,res) =>{
    res.send('Got a POST request at /user')
   
}

updateReservation = async (req,res) =>{
    res.send('Got a PUT request at /user')
   
}
deleteReservation = async (req,res) =>{
    res.send('Got a PUT request at /user')
   
}

module.exports = {
    getAllReservation,
    postNewReservation,
    updateReservation,
    deleteReservation
}