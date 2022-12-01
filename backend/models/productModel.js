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
    default: "Instock"
  },
  Location: {
    type: String,
    default: 'Joe Mama Avenue'
  },
  Tags: {
    type: Array,
    default: []
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
    type: Number,
    required: true,
  },
  creatorID: {
    type: String,
    required: true
  },
  discount: {
    type: Number,
    default: 0,
    required: true
  }
});

module.exports = mongoose.model("Products", ProductSchema);
