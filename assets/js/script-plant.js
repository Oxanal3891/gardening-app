$(document).ready(function(){

    $("#plant-confirm-btn").on("click", function(){
        let plantApiKey = "sk-Jxju658491ed6a8d13552";
        let userPlantInput = $("#userPlantName").val().toLowerCase().trim();
        console.log(userPlantInput);
        $("#plantsearch").trigger("reset");
        let requestOptions = {
        method: 'GET',
        redirect: 'follow'
        };
        let plantChoices = [];
       
        // Plant List - search by plant keyword under 'q' to return 'ID'
        fetch("https://perenual.com/api/species-list?q=" + userPlantInput + "&key=" + plantApiKey, requestOptions)
            .then(response => response.json())
            .then(result => {
                plantChoices = result.data.filter((plant) => {
                    return plant.common_name.includes(userPlantInput);
                });
                console.log(plantChoices);
            })
            .catch(error => console.log('error', error));

        // Plant Details - search by 'ID' to return info of plant
        fetch(`https://perenual.com/api/species/details/66?key=sk-Jxju658491ed6a8d13552`, requestOptions)
            .then(response => response.json())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
        
        // Plant Guides - use 'ID' to search 'species_id' to return care guides
        fetch(`https://perenual.com/api/species-care-guide-list?Species_ID=66&key=sk-Jxju658491ed6a8d13552`, requestOptions)
            .then(response => response.json())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
    })  
    })