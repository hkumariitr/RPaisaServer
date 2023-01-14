module.exports = (req, res, next) =>{
    const { name,enrolment, email,password } = req.body;
  
    function validEmail(userEmail) {
      return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);
    }
  
    if (req.path === "/register") {
      
      if (![email, name, password].every(Boolean)) {
        return res.status(401).json("Missing Credentials");
      } else if (!validEmail(email)) {
        return res.status(401).json("Invalid Email");
      }
    } else if (req.path === "/login") {
      if (![enrolment, password].every(Boolean)) {
        return res.status(401).json("Missing Credentials");
      } 
    }
  
    next();
  };