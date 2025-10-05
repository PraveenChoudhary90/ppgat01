const express= require("express");
const app =express();
const cors = require("cors");
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
require("dotenv").config();
const path = require('path');
const StuRoute = require("./Routes/StuRoute")
const paypal = require("paypal-rest-sdk");
const Payment = require('./Model/Payment'); // Import the model


app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// Parse incoming requests with JSON payloads
app.use(bodyParser.json());

// Parse incoming requests with urlencoded payloads
app.use(bodyParser.urlencoded({ extended: true }));


mongoose.connect(process.env.CONNECTION).then(()=>{
    console.log("DB IS CONNECTED");
})





// PayPal Configuration
paypal.configure({
  mode: "sandbox", // Change to 'live' for production
  client_id: process.env.PAYPAL_CLIENT_ID,
  client_secret: process.env.PAYPAL_CLIENT_SECRET,
});

// ==========================
// 📤 Create PayPal Payment
// ==========================
app.post("/api/pay", (req, res) => {
  const { total, cartItems } = req.body;

  // Convert items to PayPal format
  const items = cartItems.map((item) => ({
    name: item.name,
    sku: item._id || item.productId || "SKU",
    price: Number(item.price).toFixed(2),
    currency: "USD",
    quantity: parseInt(item.qty),
  }));

  const create_payment_json = {
    intent: "sale",
    payer: {
      payment_method: "paypal",
    },
    redirect_urls: {
      return_url: "http://localhost:8000/api/success",
      cancel_url: "http://localhost:8000/api/cancel",
    },
    transactions: [
      {
        item_list: {
          items: items,
        },
        amount: {
          currency: "USD",
          total: Number(total).toFixed(2),
        },
        description: "Payment from React App",
      },
    ],
  };

  // Create PayPal payment
  paypal.payment.create(create_payment_json, (error, payment) => {
    if (error) {
      console.error("❌ PayPal Payment Error:", JSON.stringify(error.response, null, 2));
      return res.status(500).json({ error: error.response });
    } else {
      const approvalUrl = payment.links.find((link) => link.rel === "approval_url");
      res.json({ approvalUrl: approvalUrl.href });
    }
  });
});

// ==========================
// ✅ Payment Success Route
// ==========================
app.get("/api/success", async (req, res) => {
  const payerId = req.query.PayerID;
  const paymentId = req.query.paymentId;

  const execute_payment_json = { payer_id: payerId };

  paypal.payment.execute(paymentId, execute_payment_json, async (error, payment) => {
    if (error) {
      console.error("❌ Payment Execution Error:", JSON.stringify(error.response, null, 2));
      return res.status(500).send("Payment execution failed");
    }

    try {
      const items = payment.transactions[0].item_list?.items || [];
      const amount = payment.transactions[0].amount.total;

      const newPayment = new Payment({
        cartItems: items.map((item) => ({
          productId: item.sku,
          name: item.name,
          price: item.price,
          qty: item.quantity,
          color: item.color || "",
          brand: item.brand || "",
          image: item.image || "",
        })),
        totalAmount: amount,
        paymentId,
        payerId,
        status: payment.state,
      });

      await newPayment.save();
      res.redirect("http://localhost:5173/success");
    } catch (err) {
      console.error("❌ DB Save Error:", err);
      res.status(500).send("Payment successful, but error saving to DB");
    }
  });
});

// ==========================
// ❌ Payment Cancel Route
// ==========================
app.get("/api/cancel", (req, res) => {
  res.redirect("http://localhost:8000/cancel");
});


const port = process.env.PORT 
app.use("/student", StuRoute);
app.listen(port,()=>{
    console.log(`Server is running on ${port} port`)
})





