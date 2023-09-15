const mongoose = require("mongoose");

const reservationSchema = mongoose.Schema({
    requestType:{
        type:String,
        
    },
    checkInDate: {
        type: Date,
        required: true
        // Add min and max if needed
    },    
    checkOutDate: {
        type: Date,
        required: true
        // Add min and max if needed
    }, 
    roomType: { 
        type: mongoose.Schema.Types.ObjectId, // Use mongoose.Schema.Types.ObjectId
        ref: 'Room',
        required: true
    },
    
    agency: { // Kalanit, Pegas, Sava + MANUEL OTHER
        type: mongoose.Schema.Types.ObjectId, // Use mongoose.Schema.Types.ObjectId
        ref: 'Agency',
        required: true
    },    
    
    addedBy: { 
        type: mongoose.Schema.Types.ObjectId, // Use mongoose.Schema.Types.ObjectId
        ref: 'User',
        required: true
    },

    status: {
        type : String,
        required: true,
        default : "pending"
    }
})

module.exports = mongoose.model('Reservation', reservationSchema);
