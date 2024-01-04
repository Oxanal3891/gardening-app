$(document).ready(function () {
    $("#plant-confirm-btn").on("click", function (e) {
        e.preventDefault();
        let userPlantInput = $("#userPlantName").val().toLowerCase().trim();
        console.log('inside search button', userPlantInput)
        if (userPlantInput.length !== 0)
            window.location.href = `./pages/plant-result.html?q=${userPlantInput}`;
    })
})