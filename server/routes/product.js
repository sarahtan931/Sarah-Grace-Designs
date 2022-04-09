const express = require('express');
const router = new express.Router();
const pool = require("../db");

//Add product 
router.post("/products", async(req, res) => {
  try{
      const {price, color, title, productdesc, size, serialNo, quantity, productimgurl} = req.body;
      const newProduct = await pool.query(`INSERT INTO product (price, color, title, productdesc, size, serialNo, quantity, productimgurl) VALUES (${price}, '${color}', '${title}', '${productdesc}', '${size}', '${serialNo}', ${quantity}, ${productimgurl}) RETURNING *`)
      res.json(newProduct)
  } catch(err){
      console.error(err.message)
  }
})

//Get all products
router.get("/products", async(req, res) => {
  try{
      const allProducts = await pool.query("SELECT * from product");
      res.json(allProducts.rows)
  }catch(err){
      console.error(err.message)
  }
})

//get additional product image url 
router.get("/products/images/:id", async(req, res) => {
    try{
        const productid = req.params.id;
        const imageUrls = await pool.query(`SELECT productimgurl from productimage WHERE productid = ${productid}`);
        res.json(imageUrls)
    }catch(err){
        console.error(err.message)
    }
  })
  

module.exports = router;