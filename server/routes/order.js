
/*const Stripe = require('stripe');
const stripe = new Stripe(process.env.SECRET_KEY);
const express = require("express");
const router = new express.Router();


router.post('/payment_intents', async (req, res) => {
  try {
    const { amount } = req.body;
    
    //send cart data back, validate before making payment
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd'
    });

    res.status(200).send(paymentIntent.client_secret);
  } catch (err) {
    console.log(err.message)
    res.status(500).json({ statusCode: 500, message: err.message });
  } 
})*/
