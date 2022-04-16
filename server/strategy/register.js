const bcrypt = require('bcrypt');
const registerPass = require('passport');
const pool = require('../db');
const LocalStrategy = require('passport-local').Strategy;

registerPass.use(
    new LocalStrategy({usernameField: 'email'}, async(email, password, done) => {
        try{
            const existinguser = await pool.query(`SELECT * FROM users WHERE email = '${email}'`)
           //if the user does not exist genereate password
            if (existinguser.rowCount == 0){
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(password, salt, async(err, hash) => {
                      if (err) {
                          throw err;
                        };
                        //add user and hashed password into the db
                       await pool.query(`INSERT INTO users (email, password) VALUES ('${email}','${hash}')`);
                       return done(null, true, null)
                    });
                  });
            }else{
                return done(null, false, 'Error | User Already Exists')
            }
        }catch(err){
            return done(null, false, 'Error Adding User');
        }
    })
);

module.exports = registerPass;
