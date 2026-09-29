document.getElementById("assignment_1_3_form").addEventListener("submit", function (e) {
    e.preventDefault();
    e.stopPropagation();

    var formData = new FormData(e.target);
    fetch_assignment_1_3(Object.fromEntries(formData));
});


function fetch_assignment_1_3(data) {
    const id = +data.useridrequester;
    if (id == undefined || id == null || id < 0 || Number.isNaN(id)) {
        return;
    }

    const genderfilter = data.genderfilter;
    const sortfilter = data.sortfilter;
    const sortorderfilter = data.sortorderfilter;

    fetch("http://localhost:3000/api/owners/" + id + "/dogs?" + new URLSearchParams(
        {gender : genderfilter, sortfilter : sortfilter, sortorder : sortorderfilter}
    )).then((response) => response.json())
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
    if (result.length == 0) {
        document.getElementById("1_3_result_table").innerHTML = "<tr><td>No results</td></tr>";
        return;
    }

    let table = "<thead><tr><th>Owner id</th><th>Owner name</th><th>Owner city</th><th>Dog id</th><th>Dog name</th><th>Dog gender</th><th>Dog birth date</th><th>Dog breed</th><th>Dog weight (kg)</th><th>Dog color</th><th>Dog adoption date</th></tr></thead><tbody>"

    for (row of result) {
        table += "<tr>";

        table += "<td>" + row.owner_id + "</td>";
        table += "<td>" + row.owner_name + "</td>";
        table += "<td>" + row.owner_city + "</td>";
        table += "<td>" + row.id + "</td>";
        table += "<td>" + row.name + "</td>";
        table += "<td>" + (row.is_girl ? "girl" : "boy") + "</td>";
        table += "<td>" + row.born_at + "</td>";
        table += "<td>" + row.breed + "</td>";
        table += "<td>" + row.weight_kg + "</td>";
        table += "<td>" + row.color + "</td>";
        table += "<td>" + row.adopted_at + "</td>";

        table += "</tr>";
    }

    table += "</tbody>"
    document.getElementById("1_3_result_table").innerHTML = table;
}


function render_error(error) {
    document.getElementById("1_3_result_table").innerHTML = "<tr><td>" + error + "</td></tr>";
}