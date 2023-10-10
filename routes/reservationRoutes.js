const {Router} = require('express');
const checkUserRole = require('../middleware/requiredRole');
const Hotel = require('../models/hotelModel');
const {  getAllReservation, getHotelRooms, postNewReservation, acceptReservation, updateReservation, deleteReservation }=require('../controllers/reservationController.js');
const router = Router();


router.get('/', checkUserRole(['callcenter', 'management']), getAllReservation);
router.get('/getRooms/:hotelName', getHotelRooms);

router.post('/new', postNewReservation);

router.post('/confirm/:id', acceptReservation);
router.post('/update/:id', updateReservation);
router.post('/delete/:id', deleteReservation);

/*router.get('/api/rooms', async (req, res) => {
    
    const selectedHotelName = req.query.hotel; // Assuming you pass the hotel name as a query parameter
    console.log(selectedHotelName);
    // Find the hotel based on the selected hotel name
    const selectedHotel = await Hotel.findOne({ name: selectedHotelName });

    if (!selectedHotel) {
      return res.status(404).json({ error: 'Hotel not found' });
    }

    const roomData = selectedHotel.rooms;

    res.json(roomData);
    });
*/
    module.exports = router;
