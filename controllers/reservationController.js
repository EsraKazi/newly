const Reservation = require("../models/reservationModel");
const Agency = require("../models/agencyModel");
const Hotel = require("../models/hotelModel");
const jwtToken = require("../middleware/jwtToken");
const moment = require("moment");
require("dotenv").config();
let autoIncrement = 1;

/////        R O U T E S       /////

/////       R E Z E R V A S Y O N   L İ S T E L E M E       /////

getAllReservation =
  ("/",
  async (req, res) => {
    const user = jwtToken.decodeToken(req);

    try {
      const userRole = user.userRole;
      const reservation = await Reservation.find();
      const agency = await Agency.find();
      const hotels = await Hotel.find();

      hotels.forEach((hotel) => {
        hotel.rooms.forEach((rooms) => {});
      });

      if (userRole === "callcenter") {
        res.render("reservationCallCenter.ejs", {
          reservationData: reservation,
          agencies: agency,
          hotels: hotels,
        });
      } else if (userRole === "management") {
        res.render("reservationManagement.ejs", {
          reservationData: reservation,
          agencies: agency,
          hotels: hotels,
        });
      } else {
        res.status(403).render("error.ejs");
      }
    } catch (error) {
      res.redirect("/");
    }
  });/////       R E Z E R V A S Y O N   A R A M A       /////

  getUpdateReservation = async (req, res) => {
    try {
      const reservationID = req.params.id;
      const reservation = await Reservation.findOne({
        reservationId: reservationID,
      });
      console.log(reservation);
      res.json(reservation);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  };
  
/////       R E Z E R V A S Y O N   D Ü Z E N L E M E      /////
postUpdateReservation = async (req, res) => {
  const user = jwtToken.decodeToken(req);

  const reservationId = req.params.id;
  const newDescription = req.body.description; // Kullanıcının girdiği yeni açıklama

  try {
    const updatedReservation = await Reservation.findOneAndUpdate(
      { reservationId },
      {
        $set: {
          description: newDescription, // Yeni açıklamayı güncelle
          updated: true,
          updatedBy: user.username,
          updatedAt: new Date(),
        },
      },
      { new: true } // Bu seçenek, güncellenen belgeyi döndürür
    );

    // Eğer başarıyla güncellendi ise yönlendirme yapabilirsiniz veya başka bir işlem gerçekleştirebilirsiniz
    res.redirect("/");
  } catch (error) {
    res.status(500).send("Rezervasyon onaylanırken bir hata oluştu");
  }
};


/////       R E Z E R V A S Y O N   O L U Ş T U R M A      /////

postNewReservation = async (req, res) => {
  const user = jwtToken.decodeToken(req);

  try {
    const hotel = req.body.hotel;
    const room = req.body.roomName;

    /////       C U S T O M    I D    O L U Ş T U R M A       /////
    const lastReservation = await Reservation.findOne({})
      .sort({ reservationId: -1 })
      .exec();

    if (lastReservation && lastReservation.reservationId) {
      const lastThreeDigits = lastReservation.reservationId.slice(-3);

      const lastReservationDate = lastReservation.reservationId.slice(0, 6);

      const currentDate = moment().format("YYMMDD");

      if (currentDate === lastReservationDate) {
        autoIncrement = parseInt(lastThreeDigits) + 1;
      } else {
        autoIncrement = 1;
      }
    }

    const currentDate = moment().format("YYMMDD");
    const hotelPrefix = hotel.substring(0, 2).toUpperCase();
    const autoIncrementValue = autoIncrement.toString().padStart(3, "0");

    const reservationId = `${currentDate}${hotelPrefix}${autoIncrementValue}`;

    /////////////////////////////////////////////////////////////////////

    const reservation = new Reservation({
      reservationId: reservationId,
      checkInDate: req.body.checkInDate,
      checkOutDate: req.body.checkOutDate,
      hotel: hotel,
      roomType: room,
      agency: req.body.agency,
      createdAt: Date.now(),
      createdBy: user.username,
      description: req.body.description,
      confirmed: false,
      confirmedAt: null,
      confirmedBy: null,
      confirmationDeadline: null,
    });

    await reservation.save();

    res.redirect("/");
  } catch (error) {
    console.error("Error:", error);
    res.redirect("/login");
  }
};

/////       R E Z E R V A S Y O N   K O N F İ R M E       /////
//confirm
acceptReservation = async (req, res) => {
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
    updatedReservation.confirmedAt = new Date();
    const confirmationDeadline = new Date();
    confirmationDeadline.setSeconds(confirmationDeadline.getSeconds() + 5);
    updatedReservation.confirmationDeadline = confirmationDeadline;
    await updatedReservation.save();

    res.redirect("/");
  } catch (error) {
    res.status(500).send("An error occurred while confirming the reservation");
  }
};

/////       R E Z E R V A S Y O N   S İ L M E       /////

deleteReservation = async (req, res) => {
  try {
    const reservationId = req.params.id;

    const deletedReservation = await Reservation.findByIdAndDelete(
      reservationId
    );

    res.redirect("/");
  } catch (error) {
    console.error(error);
  }
};

/////       A P I ' S       /////

/////      O T E L / O D A    F İ L T R E L E M E      /////

getHotelRooms = async (req, res) => {
  try {
    const hotelName = req.params.hotelName;
    const hotel = await Hotel.findOne({ name: hotelName });
    const roomNames = hotel.rooms.map((room) => room.roomName);
    res.json(roomNames);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};


module.exports = {
  getAllReservation,
  getHotelRooms,
  postNewReservation,
  acceptReservation,
  postUpdateReservation,
  getUpdateReservation,
  deleteReservation,
};
