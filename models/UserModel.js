const db=require("../db/db")

async function createUser(username,password) {
    
    const sql = "INSERT INTO users (username,password) VALUES ('" +
        username + "', '" + password + "') "
    await  db.query(sql,[])
}

function log() {
    console.log("user");
}
module.exports ={
    createUser,
    log
}