const Reservation = require('../models/reservationModel');
const Agency = require('../models/agencyModel');
const jwtToken = require('../middleware/jwtToken');
require("dotenv").config(); 

getAllReservation = ('/', async (req, res) => {
  const user = jwtToken.decodeToken(req);
  try {
    const userRole = user.userRole;
    const reservation = await Reservation.find();
    const agency = await Agency.find();
    
    if (userRole === 'callcenter') {
      res.render('reservationCallCenter.ejs', {
        reservationData: reservation,
        agencies: agency,
      });
    } else if (userRole === 'management') {
      res.render('reservationManagement.ejs', {
        reservationData: reservation,
        agencies: agency,
      });
    } else {
      res.status(403).render('error.ejs');
    }
  } catch (error) {
    console.error(error);
    res.redirect('/');
  }
});

postNewReservation = async (req, res) => {
  const user = jwtToken.decodeToken(req);
  try {
    const reservation = new Reservation({
      checkInDate: req.body.checkInDate,
      checkOutDate: req.body.checkOutDate,
      roomType: req.body.roomType,
      agency: req.body.agency,
      addedBy: user.username,
      confirmed: false, 
      confirmationDeadline: null, 
    });

    await reservation.save();
    res.redirect('/');
  } catch (error) {
    console.error(error);
    res.render('error.ejs')
  }
};

updateReservation = async (req, res)  => {
  const reservationId = req.params.id;
  const newStatus = req.body.status;

  try {
    const updatedReservation = await Reservation.findByIdAndUpdate(
      reservationId,
      { status: newStatus }
    );

    if (!updatedReservation) {
      return res.status(404).send('Reservation not found');
    }

    if(newStatus === "onaylandi"){
      const confirmationDeadline = new Date();
      confirmationDeadline.setHours(confirmationDeadline.getHours() + 3);
      updatedReservation.confirmationDeadline = confirmationDeadline;
    }

    await updatedReservation.save();

    res.redirect('/');
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while updating the reservation');
  }
};  

module.exports = {
  getAllReservation,
  postNewReservation,
  updateReservation
};
