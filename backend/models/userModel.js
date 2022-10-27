const mongoose = require("mongoose");

const User = mongoose.model("User", {
  email: {
    type: String,
    required: true,
    unique: true,
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
