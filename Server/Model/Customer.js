const mongoose = require('mongoose')
// cricketTicket = use('./cricketTicket')
const customerSchema = new mongoose.Schema({
    email : {
        type : String,
        required:true
    },
    fname :{
        type: String,
        required:true,
    
    },
    lname : {
        type:String,
        required:true
    },
    Password : {
        type:String,
        required:true
    },
    Status : {
        type : String,
        enum : ['Pending' , 'Active'],
        default : 'Pending'
    },
    confirmationCode : {
        type : String,
        unique : true
    },
    cricketTicket : [{
        type : mongoose.Schema.Types.ObjectId, ref: 'cricketTicket',
        // required:true
    }],
    busTicket : [{
        type : mongoose.Schema.Types.ObjectId, ref: 'buses',
        // required:true
    }]

    
});

customer = mongoose.model("customerdata", customerSchema)
module.exports = customer