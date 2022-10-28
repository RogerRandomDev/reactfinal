const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true,
  },
  ProductType: {
    type: String,
    required: true,
  },
  ProductDescription: {
    type: String,
    required: true,
  },
  Rating: {
    type: Number,
    default: 5,
  },
  ProductCreator: {
    type: String,
    required: true,
  },
  Location: {
    type: String,
  },
  Tags: {
    type: Array,
  },
  ProductAmount: {
    type: Number,
    default: 1,
  },
  ImageLinks: {
    type: Array,
    required: true,
  },
  ProductPrice: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Business", BusinessSchema);
