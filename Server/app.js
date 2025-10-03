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


// 🔗 API to create a payment
app.post("/api/pay", (req, res) => {
  const { total } = req.body;

  const create_payment_json = {
    intent: "sale",
    payer: {
      payment_method: "paypal",
    },
    redirect_urls: {
      return_url: "http://localhost:8000/success",
      cancel_url: "http://localhost:8000/cancel",
    },
    transactions: [
      {
        amount: {
          currency: "USD",
          total: total.toString(),
        },
        description: "Payment from My React App",
      },
    ],
  };

  paypal.payment.create(create_payment_json, function (error, payment) {
    if (error) {
      console.error(error.response);
      res.status(500).send("Error creating PayPal payment");
    } else {
      const approvalUrl = payment.links.find((link) => link.rel === "approval_url");
      res.json({ approvalUrl: approvalUrl.href });
    }
  });
});


// ✅ Keep only this version
app.get("/api/success", async (req, res) => {
  const payerId = req.query.PayerID;
  const paymentId = req.query.paymentId;

  try {
    const execute_payment_json = {
      payer_id: payerId,
    };

    paypal.payment.execute(paymentId, execute_payment_json, async function (error, payment) {
      if (error) {
        console.error(error.response);
        res.status(500).send("Payment failed");
      } else {
        const cartItems = payment.transactions[0].item_list?.items || [];
        const amount = payment.transactions[0].amount.total;

        const newPayment = new Payment({
          cartItems: cartItems.map(item => ({
            productId: item.sku,
            name: item.name,
            price: item.price,
            qty: item.quantity,
            color: item.color,
            brand: item.brand,
            image: item.image
          })),
          totalAmount: amount,
          paymentId,
          payerId,
          status: payment.state
        });

        await newPayment.save();

        res.redirect("http://localhost:8000/success");
      }
    });
  } catch (err) {
    console.error("Error saving payment:", err);
    res.status(500).send("Internal Server Error");
  }
});



const port = process.env.PORT 
app.use("/student", StuRoute);
app.listen(port,()=>{
    console.log(`Server is running on ${port} port`)
})





