function are_parameters_valid(name, email, phone, city) {
    if (name.length < 1) {
        return 1;
    }
    if (email.length < 1) {
        return 2;
    }
    if (phone.length < 1) {
        return 3;
    }
    if (city.length < 1) {
        return 4;
    }
    return 0;
}


function is_id_valid(id) {
    if (typeof(id) != "number") return 1;
    if (Number.isNaN(id)) return 2;
    if (id < 0) return 3;
    if (Math.floor(id) != id || Math.ceil(id) != id) return 4;
    
    return 0;
}


function construct_sql() {
    return "UPDATE owners SET owners.name = ?, owners.email = ?, owners.phone = ?, owners.city = ? WHERE owners.id = ?;";
}


function construct_parameters(id, name, email, phone, city) {
    return [name, email, phone, city, id];
}


module.exports = { is_id_valid, are_parameters_valid, construct_sql, construct_parameters };