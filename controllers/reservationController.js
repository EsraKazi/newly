const Reservation = require('../models/reservationModel');
const Agency = require('../models/agencyModel');
const Room = require('../models/roomModel');
const jwtToken = require('../middleware/jwtToken');
const moment = require("moment");
require("dotenv").config(); 

let autoIncrement = 1;

getAllReservation = ('/', async (req, res) => {
  const user = jwtToken.decodeToken(req);
  try {
    const userRole = user.userRole;
    const reservation = await Reservation.find();
    const agency = await Agency.find();
    const roomType = await Room.find();
    
    if (userRole === 'callcenter') {
      res.render('reservationCallCenter.ejs', {
        reservationData: reservation,
        agencies: agency,
        roomType : roomType
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
    const hotel = req.body.hotel;

    const lastReservation = await Reservation.findOne({})
    .sort({ reservationId: -1 })
    .exec();
  
    if (lastReservation && lastReservation.reservationId) {
      const lastThreeDigits = lastReservation.reservationId.slice(-3);

      const lastReservationDate = lastReservation.reservationId.slice(0, 6);

      const currentDate = moment().format('YYMMDD');

      if (currentDate === lastReservationDate) {
        autoIncrement = parseInt(lastThreeDigits) + 1;
      } else {
        autoIncrement = 1;
      }
    }

    const currentDate = moment().format('YYMMDD');
    const hotelPrefix = hotel.substring(0, 2).toUpperCase();

    const autoIncrementValue = autoIncrement.toString().padStart(3, '0');

    const reservationId = `${currentDate}${hotelPrefix}${autoIncrementValue}`;

    const reservation = new Reservation({
      reservationId: reservationId,
      checkInDate: req.body.checkInDate,
      checkOutDate: req.body.checkOutDate,
      roomType: req.body.roomType,
      hotel: req.body.hotel,
      agency: req.body.agency,
      addedBy: user.username,
      description: req.body.description,
      confirmed: false,
      confirmationDeadline: null,
    });

    await reservation.save();

    res.redirect('/');
  } catch (error) {
    res.redirect('/login');
  }
};


updateReservation = async (req, res)  => {
  const user = jwtToken.decodeToken(req);

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
      confirmed = true;
      const confirmationDeadline = new Date();
      confirmationDeadline.setHours(confirmationDeadline.getHours() + 3);
      updatedReservation.confirmationDeadline = confirmationDeadline;
      confirmedBy = user.username
    }

    await updatedReservation.save();

    res.redirect('/');
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while updating the reservation');
  }
};  

updateReservationCallCenter = async (req, res)  => {
  const reservationId = req.params.id;

  try {
    const updatedReservation = await Reservation.findByIdAndUpdate( {
        checkInDate: req.body.checkInDate,
        checkOutDate: req.body.checkOutDate,
        roomType: req.body.roomType,
        agency: req.body.agency,
        addedBy: user.username,
        description: req.body.description,
        confirmed: false, 
        confirmationDeadline: null, 
    }    );

    if (!updatedReservation) {
      return res.status(404).send('Reservation not found');
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
  updateReservation,
  updateReservationCallCenter
};
