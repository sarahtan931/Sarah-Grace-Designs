const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

//middleware
app.use(cors());
app.use(express.json()); //req.body

// Allow dotfiles - this is required for verification by Lets Encrypt's certbota
//app.use(express.static(path.join(__dirname, '../build'), {dotfiles: 'allow'}));

//ROUTES//

//Add product 
app.post("/products", async(req, res) => {
    try{
        const {price, color, title, productdesc, size, serialNo, quantity} = req.body;
        const newProduct = await pool.query(`INSERT INTO product (price, color, title, productdesc, size, serialNo, quantity) VALUES (${price}, '${color}', '${title}', '${productdesc}', '${size}', '${serialNo}', ${quantity}) RETURNING *`)
        res.json(newProduct)
    } catch(err){
        console.error(err.message)
    }
})

//Get all products
app.get("/products", async(req, res) => {
    try{
        const allProducts = await pool.query("SELECT * from product");
        res.json(allProducts)
    }catch(err){
        console.error(err.message)
    }
})

app.listen(5000, () => {
    console.log("server has started on port 5000")
})

