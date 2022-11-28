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
  //should be true if bought with card
  purchaseMethod:{
    type:Boolean,
    required:true
  },
  purchasePrice:{
    type:Number,
    required:true
  }
});

module.exports = mongoose.model('Transactions', TransactionSchema);
