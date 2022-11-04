const mongoose = require("mongoose");

const TransactionSchema = mongoose.Schema({
  seller:{
    type:String,
    required:true
  },
  buyer:{
    type:String,
    required:true
  },
  timeStamp:{
    type:Number,
    required:true
  },
  productID:{
    type:Number,
    required:true
  },
  //don't be stupid, it only stored the last four digits
  buyerDigits:{
    type:Number,
    required:true
  },
  sellerDigits:{
    type:Number,
    required:true
  },
  purchasePrice:{
    type:Number,
    required:true
  }
});

module.exports = mongoose.model('Transactions', TransactionSchema);
