const express = require("express");
const path = require("path");
const multer = require("multer");
const mysql = require("mysql");

//#region sql init
const sql = mysql.createConnection({
    host : "localhost",
    port : 3306,
    user : "root",
    password : "",
    database : "dog_club",
});

sql.connect(err => {
    if (err) {
        console.warn("Can't connect, error: ", err.message);
    }
    else {
        console.log("MySQL connected")
    }
});
//#endregion

//#region html server init
const port = 3000;
const app = express();

app.use(express.urlencoded());
app.use(express.json());

app.listen(port, () => {
    console.log("Backend is running on port ", port)
});
//#endregion

app.get("/", (req, res) => res.redirect("/index"));
app.get("/index", (req, res) => res.status(200).sendFile(path.join(__dirname, "./index.html")));
app.get("/style.css", (req, res) => res.status(200).sendFile(path.join(__dirname, "./style.css")));