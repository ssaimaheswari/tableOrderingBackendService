const { Cart, CartItem, MenuItem } = require('../models');

exports.getCart = async (req, res) => {
  const userId = req.user.id;
  try {
    const cart = await Cart.findOne({
      where: { user_id: userId },
      include: [{ model: CartItem, include: [MenuItem] }]
    });
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch cart' });
  }
};

exports.addToCart = async (req, res) => {
  const userId = req.user.id;
  const { menuItemId, quantity } = req.body;
  try {
    let cart = await Cart.findOne({ where: { user_id: userId } });
    if (!cart) {
      cart = await Cart.create({ user_id: userId });
    }
    let cartItem = await CartItem.findOne({
      where: { cart_id: cart.id, menu_item_id: menuItemId }
    });
    if (cartItem) {
      cartItem.quantity += quantity;
      await cartItem.save();
    } else {
      cartItem = await CartItem.create({
        cart_id: cart.id,
        menu_item_id: menuItemId,
        quantity
      });
    }
    res.status(201).json(cartItem);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add item to cart' });
  }
};

exports.removeFromCart = async (req, res) => {
  const userId = req.user.id;
  const { menuItemId } = req.body;
  try {
    const cart = await Cart.findOne({ where: { user_id: userId } });
    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }
    const cartItem = await CartItem.findOne({
      where: { cart_id: cart.id, menu_item_id: menuItemId }
    });
    if (!cartItem) {
      return res.status(404).json({ error: 'Item not found in cart' });
    }
    await cartItem.destroy();
    res.status(200).json({ message: 'Item removed from cart' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to remove item from cart' });
  }
};
