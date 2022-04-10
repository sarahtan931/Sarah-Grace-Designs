const express = require('express');
const router = new express.Router();
const pool = require("../db");

//Add product 
router.post("/products", async(req, res) => {
  try{
      const {price, color, title, productdesc, size, serialNo, quantity, productimgurl} = req.body;
      console.log(`INSERT INTO product (price, color, title, productdesc, size, serialno, quantity, productimgurl) VALUES (${price}, '${color}', '${title}', '${productdesc}', '${size}', '${serialNo}', ${quantity}, '${productimgurl}') RETURNING *`)
      const newProduct = await pool.query(`INSERT INTO product (price, color, title, productdesc, size, serialno, quantity, productimgurl) VALUES (${price}, '${color}', '${title}', '${productdesc}', '${size}', '${serialNo}', ${quantity}, '${productimgurl}') RETURNING *`)
      res.json(newProduct)
  } catch(err){
      console.error(err.message)
  }
})

//Get product by id
router.get("/products/id/:id", async(req, res) => {
    try{
        const allProducts = await pool.query(`SELECT * from product WHERE id=${req.params.id} `);
        res.json(allProducts.rows)
    }catch(err){
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

  //get products by category
  router.get("/products/:category", async(req, res) => {
      try{
        const category = req.params.category;
        const categoryFromDb = await pool.query(`SELECT id from categories WHERE category = '${category}'`);
        const categoryId = categoryFromDb.rows[0].id;
        const productsRes = await pool.query(`SELECT * from product JOIN productcategories ON product.id = productcategories.productid  WHERE productcategories.categoryid = ${categoryId}`);
        const products = productsRes.rows;
        res.json(products);
      }catch(err){
          console.error(err.message)
      }
  })

  //add product to cateogyr
  router.post("/products/category", async(req, res) => {
      try{
          const productId = req.body.productid;
          const categoryId = req.body.categoryid;
          const response = await pool.query(`INSERT INTO productcategories(categoryid, productid) VALUES (${categoryId}, ${productId})`);
          res.json(response)

      }catch(err){
          console.error(err.message)
      }
  })
  

module.exports = router;