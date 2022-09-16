const socket = require("socket.io")
const express = require("express")
const app= express()
const PORT = 3000 || process.env.PORT

const session = require('express-session')
const {Pool} = require('pg');
const pgSession = require('connect-pg-simple')(session)
const poolpg = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'pwelp',
    password: 'root',
    port: 5432,
});

app.use(express.static("public"))
app.set("view engine","ejs")

app.use(session({
  
    secret: "pwelp",
    resave: false,
    saveUninitialized: true
}))

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

const homeRoutes = require("./routes/home.routes");
const prijavaRoutes = require("./routes/prijava.routes")
const regRoutes = require("./routes/reg.routes")
const clubRoutes = require("./routes/club.routes")
const clientRoutes = require("./routes/client.routes")



app.use("/",homeRoutes)
app.use("/prijava",prijavaRoutes)
app.use("/reg",regRoutes)
app.use("/club",clubRoutes)
app.use("/client",clientRoutes)

var server=app.listen(PORT , () => console.log("Server running on port " + PORT))

var io = socket(server)
io.sockets.on("connection",newConnection)

function newConnection(socket) {
    socket.on('join', function(room) {
        
        
        socket.join(room);
        
    });
    socket.on('hello', function(data) {
      
       
       if(io.sockets.adapter.rooms.get(data.room)) {
       io.to(data.room).emit("msg",{narudzba:data.narudzba,id:data.id})
       console.log("ima ih") }
       else 
       console.log("kurac")

        
    });

}

