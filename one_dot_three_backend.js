function check_id_validity(id) {
    if (typeof(id) != "number") return 1;
    if (Number.isNaN(id)) return 2;
    if (id < 0) return 3;
    if (Math.floor(id) != id || Math.ceil(id) != id) return 4;
    
    return 0;
}

function check_query_params_validity(gender, sort, sortorder) {
    switch (gender) {
        case "none":
            break;
        case "true":
            break;
        case "false":
            break;
        default:
            return 1;
    }
    switch (sort) {
        case "born_at":
            break;
        case "name":
            break;
        case "weight_kg":
            break;
        default:
            return 2;
    }
    switch (sortorder) {
        case "asc":
            break;
        case "desc":
            break;
        default:
            return 3;
    }
    return 0;
}


function construct_query(id, gender, sort, sortorder) {
    let query = "SELECT owners.id AS owner_id, owners.name AS owner_name, owners.city AS owner_city, ";
    query += "dogs.id, dogs.name, dogs.is_girl, dogs.born_at, dogs.breed, dogs.weight_kg, dogs.color, dogs.adopted_at ";
    query += "FROM owners INNER JOIN dogs ON owners.id = dogs.owner_id WHERE ";
    query += "owners.id = " + id + " ";

    if (gender != "none") {
        query += "AND dogs.is_girl = ";
        query += (gender == "true" ? "1 " : "0 ");
    }
    query += "ORDER BY dogs." + (sort == "born_at" ? "born_at" : (sort == "name" ? "name" : "weight_kg")) + " "; // Safety ternary
    query += (sortorder == "asc" ? "ASC" : "DESC");

    return query + ";"
}


module.exports = { check_query_params_validity, check_id_validity, construct_query };