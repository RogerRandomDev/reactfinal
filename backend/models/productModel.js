const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  images: {
    type: Array,
    required: true
  },
  pros: {
    type: Array,
    required: true
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  Location: {
    type: String,
    default:'nowhere'
  },
  Tags: {
    type: Array,
    default:[]
  },
  quantity: {
    type: Number,
    default: 1,
  },
  price: {
    type: Number,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  creatorID:{
    type:String,
    required:true
  }
});

module.exports = mongoose.model("Products", ProductSchema);
