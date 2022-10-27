const mongoose = require("mongoose");

const User = mongoose.model("User", {
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username:{
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
  },
  myBusiness: {
    type: String,
    default: ""
  }
});

module.exports = User;
