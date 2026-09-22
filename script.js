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
        console.log(owners);
    }).catch((error) => {
        console.warn(error);
    }).finally();
}