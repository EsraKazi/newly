var userSchema = require('./userModel')
const mongoose = require("mongoose");

const reservationSchema = mongoose.Schema = ({
    
    agency : { // Kalanit, Pegas, Sava + MANUEL OTHER
        type : String,
        required : true
    },    
    /*checkInDate : {
        type : Date,
        min: ,
        max : ,
        required : true
    },    
    checkOutDate : {
        type : Date,
        min: ,
        max : ,
        required : true
    }, */
    roomType : {
        type : String,
        required : true
    },
    
    employee: { 
        type: Schema.Types.ObjectId, 
        ref: 'Agency',
        required : true
    }
})

module.exports = mongoose.model('Reservation',reservationSchema);

/*var userSchema = require('./userModel')
const mongoose = require("mongoose");

const reservationSchema = mongoose.Schema = ({
    
    agency : { // Kalanit, Pegas, Sava + MANUEL OTHER
        type: Schema.Types.ObjectId, 
        ref: 'Agency',
        required : true
    },    
    checkInDate : {
        type : Date,
        min: ,
        max : ,
        required : true
    },    
    checkOutDate : {
        type : Date,
        min: ,
        max : ,
        required : true
    }, 
    roomType : {
        type: Schema.Types.ObjectId, 
        ref: 'Room',
        required : true
    },
    
    addedBy: { 
        type: Schema.Types.ObjectId, 
        ref: 'User',
        required : true
    }
})

module.exports = mongoose.model('Reservation',reservationSchema); */