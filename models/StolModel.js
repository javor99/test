const db=require("../db/db")
const qrcode=require("qrcode")

async function createStol(userid,name,qr) {
    
    const sql = "INSERT INTO stolovi (userid,ime,qr) VALUES ('" +
        userid + "', '" + name + "', '" + qr + "') "
    await  db.query(sql,[])
}

async function generateQr(text) {
    
    try {
        console.log(await qrcode.toDataURL(text))
    } catch(err) {
        console.error(err)
    }

    return await qrcode.toDataURL(text)


    }
module.exports ={
    createStol,
    generateQr
}