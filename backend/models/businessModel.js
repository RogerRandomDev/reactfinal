const mongoose = require('mongoose');

const BusinessSchema = new mongoose.Schema({
  Name: {
    type:String,
    required: true
  },
  email: {
    type: String,
    required: true,
  },
  Location: {
    type:Array,
    required:true
  },
  Description: {
    type: String,
    required: true,
  },
  Range:{
    type:String,
    required:true
  },
  Rating: {
    type: Number,
    default: 5,
  },
  BannerLink: {
    type: String,
    required: true,
  },
  chosenAgreements:{
    type:Array,
    required:true
  }
});

module.exports = mongoose.model('Business', BusinessSchema);
