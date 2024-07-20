const { Order, OrderItem, Cart, CartItem } = require('../models');

exports.createOrder = async (req, res) => {
  const userId = req.user.id;
  const { table_id, restaurant_id } = req.body;
  try {
    const cart = await Cart.findOne({
      where: { user_id: userId },
      include: [{ model: CartItem }]
    });
    if (!cart) {
      return res.status(400).json({ error: 'Cart is empty' });
    }
    const order = await Order.create({ table_id, restaurant_id, status: 'confirm' });
    const orderItems = cart.CartItems.map(cartItem => ({
      order_id: order.id,
      menu_item_id: cartItem.menu_item_id,
      quantity: cartItem.quantity
    }));
    await OrderItem.bulkCreate(orderItems);
    await CartItem.destroy({ where: { cart_id: cart.id } });
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create order' });
  }
};
