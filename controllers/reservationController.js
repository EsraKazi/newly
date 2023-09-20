const Reservation = require('../models/reservationModel');
const Agency = require('../models/agencyModel');
const jwtToken = require('../middleware/jwtToken');
require("dotenv").config(); 

// Tüm rezervasyonları al ve göster
getAllReservation = ('/', async (req, res) => {
   
    try {
        // Tüm rezervasyonları veritabanından al
        var reservation = await Reservation.find();
        var agency = await Agency.find();
        res.render('reservationNew.ejs', {
            reservationData: reservation,
            agencies : agency
        });
    } catch (error) {
        // Hata durumunda ana sayfaya yönlendir
        res.redirect('/');
    }
});

// Yeni bir rezervasyon oluştur
postNewReservation = async (req, res) => {
    const user = jwtToken.decodeToken(req);
    try {
        const reservation = new Reservation({
            requestType: req.body.requestType, // Use req.body.requestType directly
            checkInDate: req.body.checkInDate, // Use req.body.checkInDate directly
            checkOutDate: req.body.checkOutDate, // Use req.body.checkOutDate directly
            roomType: req.body.roomType, // Use req.body.roomType directly
            agency: req.body.agency, // Use req.body.agency directly
            addedBy: user.username
          });
  
      // Rezervasyonu veritabanına kaydet
      await reservation.save();
  
      // İhtiyaca göre yönlendirme veya yanıt gönderme
      res.redirect('/'); // Rezervasyonlar sayfasına yönlendir
    } catch (error) {
      console.error('Rezervasyon oluşturulurken hata:', error);
      res.status(500).send('Rezervasyon oluşturulurken hata oluştu');
    }
  };
  

// Rezervasyonu güncelle
updateReservation = async (req, res) => {
    try {
        const { id } = req.params; // Rota parametresinden rezervasyon ID'sini al
        const { newStatus } = req.body;

        // ID'ye göre rezervasyonu bul
        const reservation = await Reservation.findById(id);

        if (!reservation) {
            return res.status(404).send('Rezervasyon bulunamadı');
        }

        // Rezervasyonun durumunu güncelle
        reservation.status = newStatus;

        // Güncellenmiş rezervasyonu kaydet
        await reservation.save();

        // İhtiyaca göre yönlendirme veya yanıt gönderme
        res.redirect('/'); // Rezervasyonlar sayfasına yönlendir
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
