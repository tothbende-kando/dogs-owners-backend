function is_id_valid(id) {
    if (typeof(id) != "number") return 1;
    if (Number.isNaN(id)) return 2;
    if (id < 0) return 3;
    if (Math.floor(id) != id || Math.ceil(id) != id) return 4;
    
    return 0;
}


function construct_sql() {
    return "DELETE FROM owners WHERE owners.id = ?;";
}


function construct_parameters(id) {
    return [id];
}


module.exports = { is_id_valid, construct_sql, construct_parameters };