//Weather display
$(document).ready(() => {
    const apiKey = "cf19e26cd84560f303a4c185e64c50ca";
    const forecastDiv = $("#forecast");

    const getCurrentWeather = () => {
        navigator.geolocation.getCurrentPosition((position) => {
            console.log(position.coords);
            const { latitude, longitude } = position.coords;

            // get city name
            fetch(`http://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${apiKey}`)
                .then((res) => {
                    if (!res.ok)
                        throw new Error("couldn't get city name");
                    return res.json();
                })
                .then((data) => {
                    const { name } = data[0];
                    $("#city-name").text(` for ${name}`);
                    return fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}`);
                })
                .then((res) => {
                    if (!res.ok)
                        throw new Error("error: couldn't get forecast data");
                    return res.json();
                })
                .then(({ list }) => {
                    const relevant = list.filter(({ dt_txt }) => dt_txt.slice(11, 13) === '12');
                    for (let forecast of relevant) {
                        const forecastCard = $("<div></div>");
                        forecastCard.addClass("card col-lg-2 col-md-2 col-sm-12");
                        const cardBody = $("<div></div>");
                        cardBody.addClass("card-body");
                        const day = $("<h5></h5>");
                        day.addClass("card-title");
                        day.text(dayjs(forecast.dt_txt).format("dddd, MMMM Do"));
                        const icon = $("<img>");
                        icon.attr("src", `https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`);
                        icon.addClass("card-img-top");
                        icon.attr("alt", forecast.weather[0].description);
                        const temp = $("<p></p>");
                        temp.text((forecast.main.temp - 273.15).toFixed(2));
                        temp.addClass("temperature card-text");

                        cardBody.append(day);
                        cardBody.append(icon);
                        cardBody.append(temp);

                        forecastCard.append(cardBody);
                        forecastDiv.append(forecastCard);
                    }
                })
        }, (e) => {
            $("#locationModal").modal('show');
            const errMsg = $("<h2></h2>");
            errMsg.text("If you turn on location, you will be able to see a 5-day forecast here.");
            errMsg.attr("id", "locationMessage");
            forecastDiv.append(errMsg);
        });
    }

    getCurrentWeather();
});


//Plant search modal validation
(() => {
    const formPlant = document.querySelector('#plantModal');
    formPlant.addEventListener('submit', (event) => {
        if (!formPlant.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
        }
        formPlant.classList.add('was-validated')
    })
})();

$('#plantsearchModal').on('hidden.bs.modal', function (e) {
    $(this)
        .find("input,text,select")
        .val('')
        .end();
    $("#plantModal").removeClass("was-validated")
});

//Inspo modal validation
function displayMessage(message) {
    var errorDiv = $("<div>")
    errorDiv.text("Please Choose at least 1 option.")
    errorDiv.css({ 'color': 'red' });
    $("#inspoModal").append(errorDiv);
    setTimeout(function () {
        errorDiv.text('');
    }, 2000);
}

(() => {
    const formInspo = document.querySelector('#inspoModal');
    formInspo.addEventListener('submit', (event) => {
        var checked = $("input[type=checkbox]:checked").length;
        if (checked == 0) {
            event.preventDefault()
            event.stopPropagation()
            displayMessage("Please Choose at least 1 option.")
        }
    })
})();

//Plant search event listener
$(document).ready(function () {
    $("#plant-confirm-btn").on("submit", function () {
        console.log('got here')
        let userPlantInput = $("#userPlantName").val().toLowerCase().trim();
        if (userPlantInput.length !== 0)
            window.location.href = `./pages/plant-result.html?q=${userPlantInput}`;
    })
})
