const db=require("../db/db")

async function createProizvod(userid,ime,cijena) {
    
    const sql = "INSERT INTO proizvodi (userid,ime,cijena) VALUES ('" +
    userid + "', '" + ime + "', '" + cijena + "') "
await  db.query(sql,[])
}

function log() {
    console.log("user");
}
module.exports ={
    createProizvod,
    log
}