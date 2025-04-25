const mongoose = require('mongoose');
const ProductSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  images: [String],
  stock: Number
});
module.exports = mongoose.model('Product', ProductSchema);