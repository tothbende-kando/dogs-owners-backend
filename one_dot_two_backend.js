function check_id_validity(id) {
    if (typeof(id) != "number") return 1;
    if (Number.isNaN(id)) return 2;
    if (id < 0) return 3;
    if (Math.floor(id) != id || Math.ceil(id) != id) return 4;
    
    return 0;
}


function construct_query(id) {
    return "SELECT * FROM owners WHERE owners.id = " + id + ";"
}


module.exports = { check_id_validity, construct_query };