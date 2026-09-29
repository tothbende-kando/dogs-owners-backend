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
    console.log(data);
}