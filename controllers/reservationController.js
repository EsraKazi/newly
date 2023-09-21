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
      res.redirect('/');
    }
  });
  
  postNewReservation = async (req, res) => {
    const user = jwtToken.decodeToken(req);
    try {
      const reservation = new Reservation({
        requestType: req.body.requestType,
        checkInDate: req.body.checkInDate,
        checkOutDate: req.body.checkOutDate,
        roomType: req.body.roomType,
        agency: req.body.agency,
        addedBy: user.username
      });
  
      await reservation.save();
      res.redirect('/');
    } catch (error) {
      console.error('Rezervasyon oluşturulurken hata:', error);
      res.status(500).send('Rezervasyon oluşturulurken hata oluştu');
    }
  };
  
  updateReservation = async (req, res) => {
    try {
      const { id } = req.params;
      const { newStatus } = req.body;
      const reservation = await Reservation.findById(id);
  
      if (!reservation) {
        return res.status(404).send('Rezervasyon bulunamadı');
      }
  
      reservation.status = newStatus;
      await reservation.save();
      res.redirect('/');
    } catch (error) {
      console.error('Rezervasyon güncellenirken hata:', error);
      res.status(500).send('Rezervasyon güncellenirken hata oluştu');
    }
  };
  
  module.exports = {
    getAllReservation,
    postNewReservation,
    updateReservation
  };
  