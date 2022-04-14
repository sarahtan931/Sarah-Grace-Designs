const bcrypt = require('bcrypt');
const loginPass = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const pool = require('../db');

// Local Strategy
loginPass.use('login',
    new LocalStrategy({usernameField: 'email'}, async(email, password, done) => {
      try{
        var result = await pool.query(`SELECT * from users where email='${email}'`);
        if (result.rows == 0){
            //if user does not exist throw an error
            throw new Error('User does not Exist')
        } else {
            //if the user exists, compare password hash
            const user = result.rows[0];
            bcrypt.compare(password, user.password, (err, isMatch) => {
                if (err) throw err;
                if (isMatch) {
                  //if the passwords match return the user
                  return done(null, user);
                } else {
                  return done(null, user, 'Error | Wrong Password')
                }
              });
        }
      }catch(err){
          //if the passwords do not match return error message
          return done(null, false, 'Error | Cannot find User');
      }
    }),
);

module.exports = loginPass;
