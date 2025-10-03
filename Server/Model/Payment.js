const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  cartItems: [
    {
      productId: String,
      name: String,
      price: Number,
      qty: Number,
      color: String,
      brand: String,
      image: String
    }
  ],
  totalAmount: {
    type: Number,
    required: true
  },
  paymentId: {
    type: String,
    required: true
  },
  payerId: {
    type: String,
    required: true
  },
  status: {
    type: String,
    default: "completed"
  },
  paidAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Payment", paymentSchema);
