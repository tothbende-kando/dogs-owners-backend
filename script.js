function assignment_1_1() {
    fetch("http://localhost:3000/api/owners")
    .then((response) => response.json())
    .then((json) => {
        const owners = json.result;
        console.log(owners);
    }).catch((error) => {
        console.warn(error);
    }).finally();
}