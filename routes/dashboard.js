const router = require("express").Router();
const pool = require("../db");
const authorization = require("../middleware/authorization")

router.get("/",authorization,async(req,res)=> {
    try {
        //req.user has the payload
        
        const user = await pool.query("SELECT name FROM users WHERE enrolment = $1",[req.user])
        res.json(user.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json("Server error");
        
    }
})
module.exports = router;