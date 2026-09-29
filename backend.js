const one_dot_one = require("./one_dot_one_backend.js");
const one_dot_two = require("./one_dot_two_backend.js");
const one_dot_three = require("./one_dot_three_backend.js");
const one_dot_four = require("./one_dot_four_backend.js");


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
    if (err) console.warn("Can't connect, error: ", err.message)
    else console.log("MySQL connected")
});
//#endregion


//#region html server init
const port = 3000;
const app = express();

app.use(express.urlencoded());
app.use(express.json());
app.use(express.static(__dirname + "/"));

app.listen(port, () => {
    console.log("Backend is running on port ", port)
});
//#endregion


app.get("/", (req, res) => res.redirect("/index"));
app.get("/index", (req, res) => res.status(200).sendFile(path.join(__dirname, "./index.html")));
app.get("/one_dot_one", (req, res) => res.status(200).sendFile(path.join(__dirname, "./one_dot_one.html")));
app.get("/one_dot_two", (req, res) => res.status(200).sendFile(path.join(__dirname, "./one_dot_two.html")));
app.get("/one_dot_three", (req, res) => res.status(200).sendFile(path.join(__dirname, "./one_dot_three.html")));
app.get("/one_dot_four", (req, res) => res.status(200).sendFile(path.join(__dirname, "./one_dot_four.html")));


app.get("/api/owners", (req, res) => {
    const {city, name, sort, sortorder, limit, offset} = req.query;

    const validity = one_dot_one.check_query_params_validity(city, name, sort, sortorder, limit, offset);
    switch (validity) {
        case 0:
            break;
        case 1:
            return res.status(400).json({error:"Limit must be at least 1", value:limit});
        case 2:
            return res.status(400).json({error:"Limit must be at most 100", value:limit});
        case 3:
            return res.status(400).json({error:"Offset must be positive or 0", value:offset});
        case 4:
            return res.status(400).json({error:"The data may only be sorted based on the name, city, or account creation date", value:sort});
        case 5:
            return res.status(400).json({error:"The data may only be sorted in ascending or descending order", value:sortorder});
        default:
            return res.status(500).json({error:"If this happened, there is a SERIOUS issue", value:validity});
    }

    const SQL_query = one_dot_one.construct_query(city, name, sort, sortorder, limit, offset);
    const SQL_parameters = one_dot_one.construct_parameters(city, name, sort, sortorder, limit, offset);

    sql.query(SQL_query, SQL_parameters, (err, result, fields) => {
        if (err) {
            console.warn("GET /api/owners error: ", err.message);
            console.log(fields);
            return res.status(500).json({err});
        }
        else {
            return res.status(200).json({result});
        }
    });
});

 
app.get("/api/owners/:id", (req, res) => {
    const id = +req.params.id;
    const validity = one_dot_two.check_id_validity(id);

    switch (validity) {
        case 0:
            break;
        case 1:
            return res.status(400).json({error:"ID must be a number, received id: ", value:id});
        case 2:
            return res.status(400).json({error:"ID must be a real number, received id: ", value:id});
        case 3:
            return res.status(400).json({error:"ID must be a positive number, received id: ", value:id});
        case 4:
            return res.status(400).json({error:"ID must be an integer, received id: ", value:id});
        default:
            return res.status(500).json({error:"If this happened, there is a SERIOUS issue, validity check result: ", value:validity});
    }

    const SQL_query = one_dot_two.construct_query(id);

    sql.query(SQL_query, (err, result, fields) => {
        if (err) {
            console.warn("GET /api/owners/{id} error: ", err.message);
            console.log(fields);
            return res.status(500).json("Internal server error");
        }
        else {
            if (result.length == 0) return res.status(404).json({error : "404 no owner with id ", value : id});
            return res.status(200).json({result});
        }
    });
});


app.get("/api/owners/:id/dogs", (req, res) => {
    const id = +req.params.id;
    const validity = one_dot_three.check_id_validity(id);

    switch (validity) {
        case 0:
            break;
        case 1:
            return res.status(400).json({error:"ID must be a number, received id: ", value:id});
        case 2:
            return res.status(400).json({error:"ID must be a real number, received id: ", value:id});
        case 3:
            return res.status(400).json({error:"ID must be a positive number, received id: ", value:id});
        case 4:
            return res.status(400).json({error:"ID must be an integer, received id: ", value:id});
        default:
            return res.status(500).json({error:"If this happened, there is a SERIOUS issue, validity check result: ", value:validity});
    }

    const gender = req.query.gender;
    const sortfilter = req.query.sortfilter;
    const sortorder = req.query.sortorder;

    const query_validity = one_dot_three.check_query_params_validity(gender, sortfilter, sortorder);

    switch (query_validity) {
        case 0:
            break;
        case 1:
            return res.status(400).json({error:"The gender filter may only be \"none\", \"true\", or \"false\", received filter: ", value:gender});
        case 2:
            return res.status(400).json({error:"The sort filter may only be \"born_at\", \"name\", or \"weight_kg\", received filter: ", value:sortfilter});
        case 3:
            return res.status(400).json({error:"The results may only be sorted in \"asc\" or \"desc\" order, received order: ", value:sortorder});
        default:
            return res.status(500).json({error:"If this happened, there is a SERIOUS issue, validity check result: ", value:query_validity});
    }

    const SQL_query = one_dot_three.construct_query(id, gender, sortfilter, sortorder);

    sql.query(SQL_query, (err, result, fields) => {
        if (err) {
            console.warn("GET /api/owners/{id} error: ", err.message);
            console.log(fields);
            return res.status(500).json("Internal server error");
        }
        else {
            return res.status(200).json({result});
        }
    });
});


app.post("/api/owners", (req, res) => {
    const name = req.body.nameinput;
    const email = req.body.emailinput;
    const phone = req.body.phoneinput;
    const city = req.body.cityinput;

    const SQL_query = one_dot_four.construct_sql(email, phone, city);
    const SQL_parameters = one_dot_four.construct_parameters(name, email, phone, city);

    console.log(SQL_query);
    console.log(SQL_parameters);

    sql.query(SQL_query, SQL_parameters, (err, result, fields) => {
        if (err) {
            console.warn("POST /api/owners error: ", err.message);
            console.log(fields);
            return res.status(500).json({err});
        }
        else {
            return res.status(200).json({result});
        }
    });
});