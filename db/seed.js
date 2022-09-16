const {Pool} = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'pwelp',
    password: 'root',
    port: 5432,
})

const sql_create_users = `DROP TABLE IF EXISTS users ;
    CREATE TABLE users (
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    username text NOT NULL UNIQUE,
    password text NOT NULL
)`;

const sql_create_stolovi = `DROP TABLE IF EXISTS stolovi;
    CREATE TABLE stolovi (
    stolid int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    userid int NOT NULL,
    ime text NOT NULL ,
    qr text NOT NULL ,
    FOREIGN KEY (userid) REFERENCES users(id)
    ON DELETE CASCADE


)`;

const sql_create_proizvodi = `DROP TABLE IF EXISTS proizvodi;
CREATE TABLE proizvodi (
pid int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
userid int NOT NULL,
ime text NOT NULL ,
cijena int NOT NULL ,
FOREIGN KEY (userid) REFERENCES users(id)
ON DELETE CASCADE


)`;


pool.query(sql_create_users, [], (err, result) => {
    if (err) {
        return console.error(err.message);
    }
    console.log("Successful creation of the 'users' table");
   
});

pool.query(sql_create_stolovi, [], (err, result) => {
    if (err) {
        return console.error(err.message);
    }
    console.log("Successful creation of the 'stolovi' table");
   
});

pool.query(sql_create_proizvodi, [], (err, result) => {
    if (err) {
        return console.error(err.message);
    }
    console.log("Successful creation of the 'proizvodi' table");
   
});






