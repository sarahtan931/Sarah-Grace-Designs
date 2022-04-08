const Pool = require("pg").Pool;
const dotenv = require('dotenv');
dotenv.config();

const password = process.env.DB_PASSWORD
const pool = new Pool({
    user: "postgres",
    password: password,
    host: "localhost",
    port: 5432,
    database: "sarahgracedesigns"
})

module.exports = pool;