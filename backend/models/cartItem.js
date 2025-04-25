const mongoose = require('mongoose');
const CartItemSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  productId: {
    type: mongoose.Schema.Types.Mixed, // or Number
  },
  quantity: Number
});
module.exports = mongoose.model('CartItem', CartItemSchema);