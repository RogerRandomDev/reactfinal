const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true,
  },
  ProductImages: {
    type: Array,
    required: true
  },
  ProductCategories: {
    type: String,
    required: true,
  },
  ProductDescription: {
    type: String,
    required: true,
  },
  productStatus: {
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
    type: String
  },
  Tags: {
    type: Array
  },
  ProductAmount: {
    type: Number,
    default: 1,
  },
  ProductPrice: {
    type: Number,
    required: true,
  },
  dateCreated: {
    type: String,
    required: true,
  },
  creatorID:{
    type:Number,
    required:true
  }
});

module.exports = mongoose.model("Products", ProductSchema);
