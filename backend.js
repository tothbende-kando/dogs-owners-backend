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
app.get("/script.js", (req, res) => res.status(200).sendFile(path.join(__dirname, "./script.js")));

app.get("/api/owners", (req, res) => {
    const city = req.query.city;
    const name = req.query.name;
    const sort = req.query.sort;
    const sortorder = req.query.sortorder;
    const limit = req.query.limit;
    const offset = req.query.offset;

    const SQL_query = construct_1_1_query(city, name, sort, sortorder, limit, offset);
    const SQL_parameters = construct_1_1_parameters(city, name, sort, sortorder, limit, offset);

    sql.query(SQL_query, SQL_parameters, (err, result, fields) => {
        if (err) {
            console.warn("GET /api/owners error: ", err.message);
            return res.status(500).json({err});
        }
        else {
            return res.status(200).json({result});
        }
    });
});


function construct_1_1_query(city, name, sort, sortorder, limit, offset) {
    let SQL = "SELECT * FROM owners ";
    SQL += construct_1_1_where_clause(city, name);
    SQL += construct_1_1_order_by_clause(sort, sortorder);
    SQL += "LIMIT ? ";
    SQL += "OFFSET ?;";
    return SQL;
}


function construct_1_1_where_clause(city, name) {
    if (city.length < 1 && name.length < 1) return "";
    if (city.length > 0 && name.length > 0) return "WHERE city = ? AND name LIKE %?%";
    if (city.length > 0) return "WHERE city = ? ";
    return "WHERE name LIKE %?% "
}


function construct_1_1_order_by_clause(sort, sortorder) {
    let clause = "ORDER BY owners.";
    switch (sort) {
        case "created_at":
            clause += "created_at ";
            break;
        case "city":
            clause += "city ";
            break;
        default:
            clause += "name ";
            break;
    }
    clause += sortorder == "asc" ? "ASC " : "DESC ";
    return clause;
}


function construct_1_1_parameters(city, name, sort, sortorder, limit, offset) {
    let params = [];
    if (city.length > 0) params.push(city);
    if (name.length > 0) params.push(name);
    params.push(+limit);
    params.push(+offset);
    return params;
}