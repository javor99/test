const express = require("express");
const router = express.Router();
const db=require("../db/db")
const user = require("../models/UserModel")




router.get("/client",(req,res)=> {
    res.render("client_reg");
    
});

router.get("/club",(req,res)=> {
    res.render("club_reg");
    
});

router.post("/club", async function (req,res) {
    let prob = await db.query("SELECT  * FROM USERS WHERE USERNAME ="+"'"+req.body.username+"'")
    if(prob.rows[0]) {
        alert("Username already exists!")
    }
    await user.createUser(req.body.username,req.body.password)
    let obj = await db.query("SELECT  * FROM USERS WHERE USERNAME ="+"'"+req.body.username+"'")
    
    let id=obj.rows[0].id
    console.log(obj.rows[0].username)
    req.session.user=obj.rows[0].username
    
    res.redirect("/club/"+id)
    res.end();
    
});




module.exports=router;