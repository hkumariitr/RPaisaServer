const jwt = require("jsonwebtoken");
require("dotenv").config();

function jwtGenerator(enrolment){
    const payload = {
        user:enrolment 
    }
    return jwt.sign(payload,process.env.jwtSecret,{expiresIn:"1hr"})
}

module.exports = jwtGenerator;