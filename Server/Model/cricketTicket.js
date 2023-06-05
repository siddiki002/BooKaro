const mongoose = require('mongoose')

const ticketSchema = new mongoose.Schema({
    team1 : {
        type: String,
        required:true
    },    
    team2 : {
        type: String,
        required:true
    },
    Date : {
        type : String,
        required:true,
        default: "11-05-2023"
    },
    venue : {
        type: String,
        required:true
    },
    city : {
        type: String,
        required:true
    },
    enclosure : {
        type : mongoose.Schema.Types.ObjectId, ref: 'enclosure'
    }
})

const ticket = mongoose.model("cricketTicket", ticketSchema)
module.exports = ticket