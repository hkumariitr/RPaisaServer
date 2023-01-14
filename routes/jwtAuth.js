const router = require('express').Router();
const pool = require("../db");
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator")
const validinfo = require("../middleware/validinfo");
const authorization = require("../middleware/authorization");
//regiter route

router.post("/register",validinfo, async(req,res)=>{
    try {
        // 1. Destructing req.body(name,enrolment,email,password)

        const {name,enrolment,email,password} = req.body;

        //2. Check user already exists (if exists, throw an error)

        const user = await pool.query("SELECT * FROM users WHERE enrolment = $1",[enrolment])
        if(user.rows.length !==0){
            return res.status(401).send("User already exists");
        }

        //3. Bcrypt Password

        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound);
        const bcryptPassword = await bcrypt.hash(password,salt);

        //4. Creating New User in the database

        const newUser = await pool.query("INSERT INTO users(name, enrolment, email, password) VALUES($1, $2,$3, $4) returning *",[name,enrolment,email,bcryptPassword])
        

        //5. Generating JWT Token

        const token = jwtGenerator(newUser.rows[0].enrolment)
        res.json(token)

    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
        
    }
});

// login route

router.post("/login",validinfo, async (req,res)=>{
    try {
        // 1. destructure req.body

        const {enrolment, password} = req.body;

        //2. check if user doesn't exist (if not then throw error)

        const user = await pool.query("SELECT * from users WHERE enrolment = $1",[enrolment])
        if (user.rows.length ===0){
            return res.status(401).json("Password or Enrolment is Incorrect");
        }

        // 3. check if incoming password is the same as db password

        const validPassword = await bcrypt.compare(password,user.rows[0].password);
        if (!validPassword){
            return res.status(401).json("Password or enrolment is incorrect")
        }

        //4. give them jwt token

        const token = jwtGenerator(user.rows[0].enrolment);
        res.json(token);


    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
        
    }
})

//Private Route

router.get("/is-verify", authorization,async(req,res)=>{
    try {
        res.json(true)
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
})

module.exports = router;
