const express = require('express');
const CartItem = require('../models/cartItem');
const router = express.Router();

router.get('/', async (req, res) => {
  const items = await CartItem.find({ userId: req.user.id });
  res.json(items);
});

router.post('/', async (req, res) => {
  const { productId, quantity } = req.body;
  let item = await CartItem.findOne({ userId: req.user.id, productId });
  if (item) {
    item.quantity = quantity;
  } else {
    item = new CartItem({ userId: req.user.id, productId, quantity });
  }
  await item.save();
  res.json(item);
});

router.delete('/:itemId', async (req, res) => {
  await CartItem.findByIdAndDelete(req.params.itemId);
  res.json({ message: 'Item removed' });
});

router.delete('/', async (req, res) => {
  await CartItem.deleteMany({ userId: req.user.id });
  res.json({ message: 'Cart cleared' });
});

module.exports = router;