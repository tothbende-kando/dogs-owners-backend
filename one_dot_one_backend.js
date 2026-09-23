function check_query_params_validity(city, name, sort, sortorder, limit, offset) {
    if (limit < 1) {
        return 1;
    }
    if (limit > 100) {
        return 2;
    }
    if (offset < 0) {
        return 3;
    }
    if (sort != "name" && sort != "city" && sort != "created_at") {
        return 4;
    }
    if (sortorder != "asc" && sortorder != "desc") {
        return 5;
    }
    return 0;
}


function construct_parameters(city, name, sort, sortorder, limit, offset) {
    let params = [];
    if (city.length > 0) params.push(city);
    if (name.length > 0) params.push("%" + name + "%");
    params.push(+limit);
    params.push(+offset);
    return params;
}


function construct_query(city, name, sort, sortorder, limit, offset) {
    let SQL = "SELECT * FROM owners ";
    SQL += construct_where_clause(city, name);
    SQL += construct_order_by_clause(sort, sortorder);
    SQL += "LIMIT ? ";
    SQL += "OFFSET ?;";
    return SQL;
}


function construct_where_clause(city, name) {
    if (city.length < 1 && name.length < 1) return "";
    if (city.length > 0 && name.length > 0) return "WHERE city = ? AND name LIKE ? ";
    if (city.length > 0) return "WHERE city = ? ";
    return "WHERE name LIKE ? "
}


function construct_order_by_clause(sort, sortorder) {
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


module.exports = { check_query_params_validity, construct_parameters, construct_query };