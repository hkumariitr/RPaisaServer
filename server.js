const express = require("express");
const app = express();
const cors = require("cors");

//middleware

app.use(cors());
app.use(express.json()) //req.body

//Routes

//register and login route
app.use("/auth",require("./routes/jwtAuth"));

// dashboard route
app.use("/dashboard",require("./routes/dashboard"))

const PORT = process.env.PORT || 4000; //port

app.get("/",(req,res)=>{
    res.send("HELLO");
})

app.listen(PORT,()=>{
    console.log("server is running on port "+PORT);
})