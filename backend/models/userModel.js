const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  username:{
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  myBusiness: {
    type: String,
    default: ""
  }
});

module.exports = mongoose.model('User', UserSchema);
