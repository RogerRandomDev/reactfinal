const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
    sender:{
        type:String,
        required:true
    },
    receiver:{
        type:String,
        required:true
    },
    message:{
        type:String,
        required:true
    },
    time:{
        type:Number,
        required:true
    }
});

module.exports = mongoose.model("Messages", MessageSchema);
