const express = require("express");
const req = require("express/lib/request");
const res = require("express/lib/response");
QrCode=require("qrcode")
const router = express.Router();
const db=require("../db/db")
const stol = require("../models/StolModel")
const proizvod = require("../models/ProizvodModel")



router.get("/:id",async function (req,res) {
    
   
    const id=req.params.id
    const search= await db.query("SELECT  * FROM USERS WHERE id ="+id)
    const search2= await db.query("SELECT  * FROM STOLOVI  WHERE userid ="+id)
    const search4 = await db.query("SELECT  * FROM PROIZVODI  WHERE userid ="+id)
    let userdata=search.rows[0]
    let stolovidata=search2.rows
    let pdata=search4.rows
    
    if(req.session.user!=userdata.username)
    return
    console.log(req.session.zadnjigumb)
    res.render("club",{userdata,stolovidata,pdata,zadnjigumb:req.session.zadnjigumb});
    
    
});

router.post("/:id",async function (req,res) {
    qr=await stol.generateQr("kurac")
   
    await stol.createStol(req.params.id,req.body.ime,qr)
    req.session.zadnjigumb="stol"
    res.redirect("/club/"+req.params.id)
    
});

router.post("/:id/novi_proizvod",async function (req,res) {
    await proizvod.createProizvod(req.params.id,req.body.ime
        ,req.body.cijena)
    
    req.session.zadnjigumb="proizvod"
    res.redirect("/club/"+req.params.id)
    
       
});

router.get("/:userid/:stolname",async function (req,res) {
    const search3= await db.query("SELECT  * FROM USERS WHERE id ="
    +req.params.userid)
    let data = search3.rows[0]
    
    if(data.username!=req.session.user)
        return
    const stoldata= await db.query("SELECT  * FROM STOLOVI  WHERE userid ="
    +req.params.userid +"AND ime='"+req.params.stolname+"'")
     
    res.render("stol",{stoldata:stoldata.rows[0],data})
     
       
   });

  


module.exports=router;

