const mongoose = require("mongoose");

const BlackListSchema = mongoose.Schema({
  email: {
    type: String
  },
  domain: {
    type: String
  }
});

module.exports = mongoose.model('EmailBlacklist', BlackListSchema);
