$(document).ready(function(){
    $("#plant-confirm-btn").on("click", function(){
        let userPlantInput = $("#userPlantName").val().toLowerCase().trim();
        if (userPlantInput.length !== 0)
            window.location.href = `./pages/plant-result.html?q=${userPlantInput}`;
    })
})