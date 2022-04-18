const express = require('express');
const router = new express.Router();
const pool = require("../db");
const passport = require('passport');
require('../strategy/passport')(passport);

// add cart item
// returns all cart items
router.post("/cart/add", async (req, res) => {
  try {
    let userId = req.body.userid;
    const email = req.body.email;
    const productid = req.body.productid;

    const quantity = req.body.quantity;
    let size = "ONE SIZE";

    if (userId == null || userId == 0) {
      //get user id
      var userIdQuery = await pool.query(`SELECT id FROM users WHERE email='${email}'`)
      //if user does not exist throw error
      if (userIdQuery.rowCount == 0) {
        res.status(400).send('Cannot find user')
      }
      userId = userIdQuery.rows[0].id;
    }

    //check to see if item exists
    var existingItem = await pool.query(`SELECT * FROM cartitem WHERE userid=${userId} and productid=${productid}`);
    
    //if does not exist insert
    if (existingItem.rowCount == 0) {
      const cartitem = await pool.query(`INSERT INTO cartitem (userid, productid, cartitemquantity, size) VALUES (${userId}, ${productid}, ${quantity}, '${size}') RETURNING *`)
      res.json(cartitem.rows)
      //if exists update
    } else {
      const cartitem = await pool.query(`UPDATE cartitem SET cartitemquantity=${quantity} WHERE  userid=${userId} and productid=${productid} RETURNING *`)
      res.json(cartitem.rows)
    }
  } catch (err) {
    res.status(400).send(err.message);
    console.error(err.message)
  }
})


// get all cart items
// returns all cart items with product detaisl
router.get('/cart/:email', async (req, res) => {
  try {

    //get user id
    var userIdQuery = await pool.query(`SELECT id FROM users WHERE email='${req.params.email}'`)
    //if user does not exist throw error
    if (userIdQuery.rowCount == 0) {
      res.status(400).send('Cannot find user')
    }
    const userId = userIdQuery.rows[0].id;
    const cartItems = await pool.query(`SELECT * from cartitem JOIN product ON cartitem.productid = product.id WHERE userid=${userId}`)
    res.json(cartItems.rows)

  } catch (err) {
    res.status(400).send(err.message);
  }
})

//remove from cart
router.delete('/cart/remove/:productid/:email', async (req, res) => {
  try {
    //get user id
    var userIdQuery = await pool.query(`SELECT id FROM users WHERE email='${req.params.email}'`)
    //if user does not exist throw error
    if (userIdQuery.rowCount == 0) {
      res.status(400).send('Cannot find user')
    }
    const userId = userIdQuery.rows[0].id;

    //delete the cart item 
    await pool.query(`DELETE FROM cartitem WHERE userId=${userId} and productId=${req.params.productid}`)
    res.status(200).send();
  } catch (err) {
    res.status(400).send(err.message);
  }
})



module.exports = router;