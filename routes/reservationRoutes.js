const { Router } = require("express");
const checkUserRole = require("../middleware/requiredRole");
const Hotel = require("../models/hotelModel");
const {
  getAllReservation,
  getHotelRooms,
  postNewReservation,
  acceptReservation,
  getUpdateReservation,
  postUpdateReservation,
  deleteReservation,
} = require("../controllers/reservationController.js");
const router = Router();

router.get("/", checkUserRole(["callcenter", "management"]), getAllReservation);
router.get("/getRooms/:hotelName", getHotelRooms);

router.post("/new", postNewReservation);

router.post("/confirm/:id", acceptReservation);
router.get("/update/:id", getUpdateReservation);
router.post("/update/:id", postUpdateReservation);
router.post("/delete/:id", deleteReservation);

module.exports = router;
