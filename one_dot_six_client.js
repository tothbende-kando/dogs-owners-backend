document.getElementById("assignment_1_6_form").addEventListener("submit", function (e) {
    e.preventDefault();
    e.stopPropagation();

    var formData = new FormData(e.target);
    fetch_assignment_1_6(Object.fromEntries(formData));
});


function fetch_assignment_1_6(data) {
    if (!is_data_valid(data)) {
        console.log("Invalid data: ", data);    
        return;
    }
    
    fetch("http://localhost:3000/api/owners/" + data.idinput, {
        method : "DELETE",
    }).then((response) => response.json())
    .then((json) => {
        render_data(json);
    }).catch((error) => {
        console.warn(error);
    }).finally();
}


function is_data_valid(data) {
    const id = +data.idinput;
    if (typeof(id) != "number") return false;
    if (Number.isNaN(id)) return false;
    if (id < 0) return false;
    if (Math.floor(id) != id || Math.ceil(id) != id) return false;
    return true;
}


function render_data(data) {
    if (data.err) document.getElementById("result").innerText = "No entries deleted";
    else if (data.result.affectedRows < 1) document.getElementById("result").innerText = "No entries deleted";
    else document.getElementById("result").innerText = data.result.affectedRows + " entries deleted";
}