const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    fname : {
        type : String,
        required:true
    },
    lname : {
        type : String,
        required:true
    },
    username : {
        type : String,
        required:true,
        default : "admin"
    },
    password : {
        type : String,
        required:true,
        default : "admin"
    }
});

const admin = mongoose.model("admin", adminSchema)
module.exports = admin