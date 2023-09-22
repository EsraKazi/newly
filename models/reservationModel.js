const mongoose = require("mongoose");

const reservationSchema = mongoose.Schema({
    requestType:{
        type:String,
        required : false
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
    
    agency: {
        type: String,
        required: true 
    },    
    
    addedBy: { 
        type: String,
        required: true
    },

    status: {
        type : String,
        default : "beklemede",
        required: true
    },

    creationDate: {
        type: Date,
        default : Date.now,
        required: true
    }
})

module.exports = mongoose.model('Reservation', reservationSchema);
