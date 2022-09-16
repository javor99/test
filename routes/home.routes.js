const express = require("express");
const router = express.Router();

router.get("/",(req,res)=> {
    res.render("home");
    console.log(req.session.user)
    
    
});


module.exports=router;