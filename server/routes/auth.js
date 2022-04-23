const passport = require('passport');
const register = require('../strategy/register.js');
const login = require('../strategy/login.js');
const utils = require('../strategy/utils.js');
const sanitizeHtml = require('sanitize-html');
const Joi = require('joi-plus');
const validEmail = Joi.string().max(256).min(1).email();
const validPass = Joi.string().max(20).min(5).trim().escape();
const validFirstName = Joi.string().max(500).min(1).trim().escape().sanitize(sanitizeHtml);
const validLastName = Joi.string().max(500).min(1).trim().escape().sanitize(sanitizeHtml);
const express = require('express');
const pool = require('../db.js');
const router = new express.Router();
require('../strategy/passport.js')(passport);


// register
router.post('/register', async(req, res, next) => {
    //validating user input 
    errorEmail = validEmail.validate(req.body.email, { escapeHTML: true });
    errorPassword = validPass.validate(req.body.password, { escapeHTML: true });
    errorFirstName = validFirstName.validate(req.body.firstname, { escapeHTML: true });
    errorLastName = validLastName.validate(req.body.lastname, { escapeHTML: true })

    if (errorEmail.error != null || errorPassword.error != null || errorFirstName.error != null || errorLastName.error != null) {
        res.status(401).send('Invalid input');
    } else {
        //if valid input register user
        register.authenticate('local', async(err, canUpdateUser, info) => {
            if (err) {
                res.status(400).send('Email already registered');
            } else {
                try {
                  if (canUpdateUser){
                    const email = req.body.email;
                    const firstname = req.body.email;
                    const lastname = req.body.lastname;

                    //update user in the db
                    await pool.query(`UPDATE users SET firstname = '${firstname}', lastname = '${lastname}' WHERE email = '${email}'`);
                  
                    //get updated user 
                    var result = await pool.query(`SELECT * from users where email='${email}'`)
                    var user = result.rows[0];

                    //issue jwt token and send to the user
                    const jwt = utils.issueJWT(user);
                    output = { success: `logged in ${email}`, user: user, token: jwt.token, expiresIn: jwt.expires, email: user.email, name: user.firstname };
                    res.status(200).send(output);
                  }else{
                    res.status(400).send({info: info})
                  }
                } catch (err) {
                    //catch error and send to the user
                    res.status(400).send({info: err});
                }

            }
        })(req, res, next);
    }
});

// login
router.post('/login', (req, res, next) => {
    //validating user input
    error1 = validEmail.validate(req.body.email, {escapeHTML: true});
    error2 = validPass.validate(req.body.password, {escapeHTML: true});
  
    if (error1.error != null || error2.error != null) {
      res.status(401).send('Invalid input');
    } else {
      //if valid input login user
      login.authenticate('login', function(err, user, info) {
        if (info) {
          res.status(400).send({info: info});
        } else {
          //issue jwt token and send to user
          const jwt = utils.issueJWT(user);
          res.status(200).send({success: `Logged in ${user.email}`, token: jwt.token, expiresIn: jwt.expires, email: user.email, name: user.firstname});
        }
      })(req, res, next);
    }
  });

module.exports = router;