document.getElementById("assignment_1_1_form").addEventListener("submit", function (e) {
    e.preventDefault();
    e.stopPropagation();

    var formData = new FormData(e.target);
    console.log(Object.fromEntries(formData));
});


function fetch_assignment_1_1(params) {
    
    fetch("http://localhost:3000/api/owners")
    .then((response) => response.json())
    .then((json) => {
        const owners = json.result;
        console.log(owners);
    }).catch((error) => {
        console.warn(error);
    }).finally();
}