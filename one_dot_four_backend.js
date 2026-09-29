function construct_sql(email, phone, city) {
    let sql = "INSERT INTO owners (name";
    let sql_end = ") VALUES (?"
    
    if (typeof(email) == "string" && email != undefined && email != null && email.length > 0) {
        sql += ", email";
        sql_end += ", ?";
    }

    if (typeof(phone) == "string" && phone != undefined && phone != null && phone.length > 0) {
        sql += ", phone";
        sql_end += ", ?";
    }

    if (typeof(city) == "string" && city != undefined && city != null && city.length > 0) {
        sql += ", city";
        sql_end += ", ?";
    }
    
    sql += sql_end + ");";
    return sql;
}


function construct_parameters(name, email, phone, city) {
    let params = [name];
    if (typeof(email) == "string" && email != undefined && email != null && email.length > 0) {
        params.push(email);
    }

    if (typeof(phone) == "string" && phone != undefined && phone != null && phone.length > 0) {
        params.push(phone);
    }

    if (typeof(city) == "string" && city != undefined && city != null && city.length > 0) {
        params.push(city);
    }
    return params;
}


module.exports = { construct_sql, construct_parameters };