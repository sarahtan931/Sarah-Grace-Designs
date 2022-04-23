
const Stripe = require('stripe');
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
})

router.post('/processorder', () => {
    //find order items decrease item quantity in db 

    //delete user cart items

    //add new order to db with user id 

    //add order items to order  

    //send confirmation email to user
})

router.get('/previousorders', () => {
    //function to get all previous order
})

module.exports = router;
