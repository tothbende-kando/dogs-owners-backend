document.getElementById("assignment_1_2_form").addEventListener("submit", function (e) {
    e.preventDefault();
    e.stopPropagation();

    var formData = new FormData(e.target);
    fetch_assignment_1_2(Object.fromEntries(formData));
});


function fetch_assignment_1_2(data) {
    const id = +data.useridrequester;

    if (id == undefined || id == null || id < 0 || Number.isNaN(id)) {
        return;
    }

    fetch("http://localhost:3000/api/owners/" + id)
    .then((response) => response.json())
    .then((json) => {
        if (json.error) {
            throw new Error(json.error + json.value);
        }
        const userdata = json.result;
        render_data(userdata);
    }).catch((error) => {
        render_error(error);
    }).finally();
}


function render_data(result) {
    const data = result[0];
    let text = "";

    text += "Name: " + data.name;
    text += "\ne-mail: " + data.email;
    text += "\nPhone number: " + data.phone;
    text += "\nCity: " + data.city;
    text += "\nAccount creation date: " + data.created_at;

    document.getElementById("result").innerText = text;
}


function render_error(error) {
    document.getElementById("result").innerText = error;
}