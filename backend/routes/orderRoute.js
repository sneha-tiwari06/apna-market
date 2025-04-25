const express = require('express');
const Order = require('../models/orderModel');
const CartItem = require('../models/cartItem');
const Product = require('../models/productModel');
const { isAdmin } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', async (req, res) => {
  const cartItems = await CartItem.find({ userId: req.user.id });
  const items = [];
  let total = 0;
  for (let cartItem of cartItems) {
    const product = await Product.findById(cartItem.productId);
    const price = product.price;
    total += price * cartItem.quantity;
    items.push({ productId: product._id, quantity: cartItem.quantity, priceAtPurchase: price });
  }
  const order = new Order({ userId: req.user.id, items, total });
  await order.save();
  await CartItem.deleteMany({ userId: req.user.id });
  res.json(order);
});

router.get('/', async (req, res) => {
  const orders = await Order.find({ userId: req.user.id });
  res.json(orders);
});

router.get('/:id', async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order || order.userId.toString() !== req.user.id) return res.sendStatus(403);
  res.json(order);
});

router.get('/admin/orders', isAdmin, async (req, res) => {
  const orders = await Order.find();
  res.json(orders);
});

router.put('/admin/orders/:id', isAdmin, async (req, res) => {
  const order = await Order.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
  res.json(order);
});

module.exports = router;