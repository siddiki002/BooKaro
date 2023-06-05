const mongoose = require('mongoose');

const busSchema = new mongoose.Schema({
    pickup : {
        type : String,
        required:true
    },
    arrival : {
        type : String,
        required:true
    },
    date : {
        type : String,
        required:true,
        default : "11-10-2023"
    },
    pickup_time : {
        type : String,
        required:true
    },
    arrival_time : {
        type : String,
        required:true
    },
    seats : {
        type : Number,
        required:true
    },
    left : {
        type : Number,
        required:true
    },
    price : {
        type : Number,
        required:true
    }
    
})

const bus = mongoose.model("bus", busSchema)
module.exports = bus