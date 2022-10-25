const express = require("express");
const router = express.Router();
const db=require("../db/db")

router.get("/:userid/:id",async function (req,res) {
    
    id=req.params.id
    userid=req.params.userid
    cjenik=await db.query("SELECT  * FROM PROIZVODI  WHERE userid ="+userid)
    
    res.render("client_stol",{data:cjenik.rows,id});
    
    
    
});


module.exports=router;