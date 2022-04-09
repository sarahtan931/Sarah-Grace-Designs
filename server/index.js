const express = require("express");
const app = express();
const cors = require("cors");
const path = require('path');

//middleware
app.use(cors());
app.use(express.json()); //req.body

// Allow dotfiles - this is required for verification by Lets Encrypt's certbota
app.use(express.static(path.join(__dirname, '../build'), {dotfiles: 'allow'}));

//ROUTES//
const fileRoute = require('./routes/file');
app.use('/api/', fileRoute);

const productRoute = require('./routes/product')
app.use('/api/', productRoute);

const authRoute = require('./routes/auth');
app.use('/api/', authRoute);

const userRoute = require('./routes/user');
app.use('/api/', userRoute);

const cartRoute = require('./routes/cart');
app.use('/api/', cartRoute);

app.listen(8080, () => {
    console.log("server has started on port 8080")
})

