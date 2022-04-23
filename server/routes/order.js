
const Stripe = require('stripe');
const stripe = new Stripe(process.env.SECRET_KEY);
const express = require("express");
const router = new express.Router();
const pool = require("../db");
<<<<<<< HEAD
const nodemailer = require("nodemailer");
=======
>>>>>>> 3393cc4353d971df55a061cb7b18e312ed5c9333


router.post('/payment_intents', async (req, res) => {
  try {
    const { amount } = req.body;
<<<<<<< HEAD

=======
    
>>>>>>> 3393cc4353d971df55a061cb7b18e312ed5c9333
    //send cart data back, validate before making payment
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd'
    });

    res.status(200).send(paymentIntent.client_secret);
  } catch (err) {
    console.log(err.message)
    res.status(500).json({ statusCode: 500, message: err.message });
<<<<<<< HEAD
  }
})

router.post('/processorder', async (req, res) => {
  try {
    let testAccount = await nodemailer.createTestAccount();
=======
  } 
})

router.post('/processorder', async(req, res) => {
  try{
>>>>>>> 3393cc4353d971df55a061cb7b18e312ed5c9333
    let userId = null;
    const body = req.body;
    const name = body.name;
    const email = body.email;
    const subtotal = body.subtotal;
    const tax = body.tax;
    const shipping = body.shipping;
    const city = body.city;
    const address = body.address;
    const state = body.state;
    const postalcode = body.postalCode;
    const products = body.products;
<<<<<<< HEAD
    const total = tax + subtotal + shipping;
=======
    const total = tax+ subtotal+shipping;
>>>>>>> 3393cc4353d971df55a061cb7b18e312ed5c9333
    //get user id 
    var userIdQuery = await pool.query(`SELECT id FROM users WHERE email='${email}'`);

    //delete user cart items
<<<<<<< HEAD
    if (userIdQuery.rowCount > 0) {
      userId = userIdQuery.rows[0].id;
      await pool.query(`DELETE from cartitem WHERE userid = ${userId}`)
    }

=======
    if (userIdQuery.rowCount > 0){
      userId = userIdQuery.rows[0].id;
      await pool.query(`DELETE from cartitem WHERE userid = ${userId}`)
    }
 
>>>>>>> 3393cc4353d971df55a061cb7b18e312ed5c9333
    //add new order to db with user id 
    var order = await pool.query(`INSERT INTO orders (status, name, email, userid, subtotal, tax, shipping, total, city, address, state, postalcode) VALUES ('Ordered', '${name}', '${email}', ${userId}, ${subtotal}, ${tax}, ${shipping}, ${total}, '${city}', '${address}', '${state}', '${postalcode}') RETURNING *;`);
    var orderId = order.rows[0].id;

    for (const product of products) {
<<<<<<< HEAD
      //add order items to order  
      //find order items decrease item quantity in db 
=======
     //add order items to order  
     //find order items decrease item quantity in db 
>>>>>>> 3393cc4353d971df55a061cb7b18e312ed5c9333
      await pool.query(`INSERT INTO orderitem (orderid, productid, orderquantity) VALUES (${orderId}, ${product.productid}, ${product.cartitemquantity})`);
      await pool.query(`UPDATE product SET quantity = quantity - 1 WHERE id=${product.productid}`);
    };

    //TODO: send confirmation email to user
<<<<<<< HEAD
    let transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: testAccount.user, // generated ethereal user
        pass: testAccount.pass, // generated ethereal password
      },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"Sarah Grace Designs" <foo@example.com>', // sender address
      to: email, // list of receivers
      subject: "Sarah Grace Designs - We Have Received Your Order", // Subject line
      text: "Thank you for ordering from Sarah Grace Designs.", // plain text body
      html: "<b>Thank you for ordering from Sarah Grace Designs.</b>", // html body
    });


    res.status(200).send("Order Processed Succesfully")
  } catch (ex) {
=======
    res.status(200).send("Order Processed Succesfully")
  }catch(ex){
>>>>>>> 3393cc4353d971df55a061cb7b18e312ed5c9333
    console.log(ex)
  }
})

router.get('/previousorders', () => {
<<<<<<< HEAD
  //TODO: function to get all previous orders
=======
    //TODO: function to get all previous orders
>>>>>>> 3393cc4353d971df55a061cb7b18e312ed5c9333
})

module.exports = router;
