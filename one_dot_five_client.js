document.getElementById("assignment_1_5_form").addEventListener("submit", function (e) {
    e.preventDefault();
    e.stopPropagation();

    var formData = new FormData(e.target);
    fetch_assignment_1_5(Object.fromEntries(formData));
});


function fetch_assignment_1_5(data) {
    if (!is_data_valid(data)) {
        console.log("Invalid data: ", data);    
        return;
    }
    
    fetch("http://localhost:3000/api/owners/" + data.idinput, {
        method : "PUT",
        body : JSON.stringify(data),
        headers: {
            "Content-type": "application/json",
        }
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
    return data.nameinput.length > 0 && data.emailinput.length > 0 && data.phoneinput.length > 0 && data.cityinput.length > 0;
}


function render_data(data) {
    if (data.err) document.getElementById("result").innerText = "No entries updated, because duplicate emails aren't allowed";
    else document.getElementById("result").innerText = data.result.affectedRows > 0 ? "Successfully overwrote " + data.result.affectedRows + " entries" : "No entries updates";
}