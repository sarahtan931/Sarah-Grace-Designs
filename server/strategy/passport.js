const fs = require('fs');

const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const pool = require("../db");

const PUB_KEY = fs.readFileSync('./keypair/id_rsa_pub.pem', 'utf8');

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: PUB_KEY,
  algorithms: ['RS256'],
};

const strategy = new JWTStrategy(options, async(payload, done) =>{
    //find user and return
    const result = await pool.query(`SELECT * FROM users WHERE id = ${payload.sub}`);
    if (result.rows.length == 0){
        return done(null, false);
    }else{
        return done(null, result.rows[0]);
    }
});

module.exports = (passport) => {
  passport.use(strategy);
};
