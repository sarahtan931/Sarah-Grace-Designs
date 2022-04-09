const express = require('express');
const router = new express.Router();
const pool = require("../db");
const passport = require('passport');
require('../strategy/passport')(passport);

//Get user info
router.get("/userinfo/:email", passport.authenticate('jwt', {session: false}), async(req, res) => {
    try{
        const userInfo = await pool.query(`SELECT * FROM users where email='${req.params.email}'`);
        res.json(userInfo.rows[0])
    }catch(err){
        console.error(err.message)
    }
  });

  module.exports = router;