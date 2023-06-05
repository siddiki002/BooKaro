const mongoose = require('mongoose');

const enclosureSchema = new mongoose.Schema({
    name : {
        type : String,
        required:true
    },
    type : {
        type : String,
        required:true
    },
    price : {
        type : Number,
        required:true
    },
    seats : {
        type : Number,
        required:true
    },
    left : {
        type : Number,
        required:true
    }
});

const enclosure = mongoose.model("enclosure", enclosureSchema)
module.exports = enclosure