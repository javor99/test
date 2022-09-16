const express = require("express");
const router = express.Router();
const user = require("../models/UserModel")
const db=require("../db/db")

router.get("/client",(req,res)=> {
    res.render("client_prijava");
    
    
});
router.get("/club",(req,res)=> {
    req.session.zadnjigumb="stol"
    res.render("club_prijava",{err:undefined});

    
    
});

router.post("/club", async function (req,res) {
    console.log(req.body)
    let obj = await db.query("SELECT  * FROM USERS WHERE USERNAME ="+"'"+req.body.username+"'")
    if(!obj.rows[0]){
        console.log("User ne postoji!")
        res.render("club_prijava",{err:"User ne postoji!"})
        
        res.end()
        return;
    }
    if(obj.rows[0].password!=req.body.password) {
        res.render("club_prijava",{err:"Kriva sifra!"})
        
        res.end()
        return;
    }
    let id=obj.rows[0].id
    req.session.user=obj.rows[0].username

    
    res.redirect("/club/"+id)
    res.end();
    
});


module.exports=router;