const Cart = require("../models/Cart");

exports.addToCart = async (req, res) => {
  try {
    const { productId, product, quantity } = req.body;
    const targetProduct = productId || product;

    if (!targetProduct) {
      return res.status(400).json({
        success: false,
        message: "Product ID is required",
      });
    }

    const itemQuantity = Number(quantity) || 1;
    let cart = await Cart.findOne({ user: req.user.id });

    if (!cart) {
      cart = await Cart.create({
        user: req.user.id,
        items: [{ product: targetProduct, quantity: itemQuantity }],
      });
    } else {
      const itemIndex = cart.items.findIndex(
        (item) => item.product.toString() === targetProduct
      );

      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += itemQuantity;
      } else {
        cart.items.push({ product: targetProduct, quantity: itemQuantity });
      }
      await cart.save();
    }

    res.status(200).json({ success: true, data: cart });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};