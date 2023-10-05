const Reservation = require('../models/reservationModel');
const Agency = require('../models/agencyModel');
const Hotel = require('../models/hotelModel');
const jwtToken = require('../middleware/jwtToken');
const moment = require("moment");
const { emitReservationUpdate } = require('../app');
require("dotenv").config(); 

let autoIncrement = 1;

getAllReservation = ('/', async (req, res) => {

  const user = jwtToken.decodeToken(req);

  try {
    const userRole = user.userRole;
    const reservation = await Reservation.find();
    const agency = await Agency.find();
    const hotels = await Hotel.find();

    hotels.forEach((hotel) => {
      hotel.rooms.forEach((rooms) => {
      });
    });
    
    if (userRole === 'callcenter') {
      res.render('reservationCallCenter.ejs', {
        reservationData: reservation,
        agencies: agency,
        hotels : hotels,
      });
    } else if (userRole === 'management') {
      res.render('reservationManagement.ejs', {
        reservationData: reservation,
        agencies: agency,
        hotels : hotels,
      });
    } else {
      res.status(403).render('error.ejs');
    }
  } catch (error) {
    res.redirect('/');
  }
});


getHotelRooms = async (req, res) => {
  try {
    const hotelName = req.params.hotelName;

    const hotel = await Hotel.findOne({ name: hotelName });
    const roomNames = hotel.rooms.map((room) => room.roomName);
    res.json(roomNames);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};


postNewReservation = async (req, res) => {
  const user = jwtToken.decodeToken(req);

  try {
    const hotel = req.body.hotel;
    const room = req.body.roomName;

    //ID oluştruma
    //#############################################################################
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
    
    //#############################################################################
    
    const reservation = new Reservation({
      reservationId: reservationId,
      checkInDate: req.body.checkInDate,
      checkOutDate: req.body.checkOutDate,
      hotel: hotel,
      roomType: room,
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

    updatedReservation.confirmed = true;
    updatedReservation.confirmedBy = user.username;
    const confirmationDeadline = new Date();
    confirmationDeadline.setHours(confirmationDeadline.getHours() + 3);
    updatedReservation.confirmationDeadline = confirmationDeadline;
    console.log(updatedReservation);

    console.log(updatedReservation);
    await updatedReservation.save();
    emitReservationUpdate(updatedReservation);



    res.redirect('/');
  } catch (error) {
    res.status(500).send('An error occurred while updating the reservation');
  }
};  

deleteReservation =  async (req, res) => {
  try {
    const reservationId = req.params.id;

    const deletedReservation = await Reservation.findByIdAndDelete(
      reservationId
    );

    res.redirect('/');
  } catch (error) {
    console.error(error);
  }
};


module.exports = {
  getAllReservation,
  getHotelRooms,
  postNewReservation,
  updateReservation,
  deleteReservation
};
