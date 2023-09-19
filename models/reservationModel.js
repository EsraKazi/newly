const mongoose = require("mongoose");

const reservationSchema = mongoose.Schema({
    requestType:{
        type:String,
        required : true
    },

    checkInDate: {
        type: Date,
        required: true
    },    

    checkOutDate: {
        type: Date,
        required: true
    }, 

    roomType: { 
        type: String,
        required: true
    },
    
    agency: { // Kalanit, Pegas, Sava + MANUEL OTHER
        type: String,
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
