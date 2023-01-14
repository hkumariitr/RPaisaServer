const Pool = require("pg").Pool;

const pool = new Pool({
    user:"main",
    password:"hackathon",
    host:"localhost",
    port:5432,
    database:"nodelogin"
});

module.exports = pool;