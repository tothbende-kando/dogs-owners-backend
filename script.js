document.getElementById("assignment_1_1_form").addEventListener("submit", function (e) {
    e.preventDefault();
    e.stopPropagation();

    var formData = new FormData(e.target);
    fetch_assignment_1_1(Object.fromEntries(formData));
});


function fetch_assignment_1_1({ cityfilter:city, namefilter:name, sortfilter:sort, sortorderfilter:sortorder, limitfilter:limit, offsetfilter:offset }) {
    fetch("http://localhost:3000/api/owners?" + new URLSearchParams(
        {city : city, name : name, sort : sort, sortorder : sortorder, limit : limit, offset : offset}
        ).toString()
    ).then((response) => response.json())
    .then((json) => {
        const owners = json.result;
        render_data(owners);
    }).catch((error) => {
        console.warn(error);
    }).finally();
}


function render_data(data) {
    let html = "";
    for (row of data) {
        html += "<tr>";
        html += "<td>" + row.id + "</td>";
        html += "<td>" + row.name + "</td>";
        html += "<td>" + row.email + "</td>";
        html += "<td>" + row.phone + "</td>";
        html += "<td>" + row.city + "</td>";
        html += "<td>" + row.created_at + "</td>";
        html += "</tr>";
    }
    document.getElementById("1_1_result_table").innerHTML = html;
}