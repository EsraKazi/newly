const Reservation = require('../models/reservationModel');

async function checkAndUpdateExpiredReservations() {
    try {
      const expiredReservations = await Reservation.find({
        status: "onaylandi",
        confirmed: false,
        confirmationDeadline: { $lt: new Date() }, // Check if the deadline has passed
      });
      // Update the status of expired reservations
      for (const reservation of expiredReservations) {
        reservation.status = "suresi-doldu";
        await reservation.save();
      }
      
  
      console.log("Scheduled task: Checked and updated expired reservations.");
    } catch (error) {
      console.error("Scheduled task error:", error);
    }
  }
  
  // Run the task every minute (adjust the interval as needed)
  setInterval(checkAndUpdateExpiredReservations, 60000); // 60000 milliseconds = 1 minute
  