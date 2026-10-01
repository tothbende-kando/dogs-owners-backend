document.getElementById("assignment_1_4_form").addEventListener("submit", function (e) {
    e.preventDefault();
    e.stopPropagation();

    var formData = new FormData(e.target);
    fetch_assignment_1_4(Object.fromEntries(formData));
});


function fetch_assignment_1_4(data) {
    fetch("http://localhost:3000/api/owners", {
        method : "POST",
        body : JSON.stringify(data),
        headers: {
            "Content-type": "application/json",
        }
    }).then((response) => response.json())
    .then((json) => {
        const result = json.result;
        render_data(result);
    }).catch((error) => {
        console.warn(error);
    }).finally();
}


function render_data(data) {
    if (data) {
        document.getElementById("result").innerText = (data.affectedRows > 0) ? "Successfully inserted " + data.affectedRows + " new entries" : "Failed to insert any new entries";
    }
    else {
        document.getElementById("result").innerText = "Failed to insert any new entries";
    }
}