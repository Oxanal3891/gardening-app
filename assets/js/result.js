$(document).ready(() => {
    const plantApiKey = "sk-kPNw65947c4f242023634";
    let requestOptions = {
    method: 'GET',
    redirect: 'follow'
    };
    
    const searchParams = new URLSearchParams(window.location.search);
    const searchQuery = searchParams.get("q");
    fetch(`https://perenual.com/api/species-list?q=${searchQuery}&key=${plantApiKey}`, requestOptions)
    .then((res) => {
        if (!res.ok)
            throw new Error('as');
        return res.json();
    })
    .then(({ data }) => {
        if (data.length === 0) {
            const errTxt = $("<h2></h2>");
            errTxt.text("No results found.");
            $(document.body).append(errTxt);
        } else
            for (let plant of data) {
                console.log(plant);
                const plantEl = $("<li></li>");
                plantEl.attr("id", plant.id);
                const link = $("<a></a>");
                link.attr("href", `./species-page.html?id=${plant.id}`);
                const head = $("<h2></h2>");
                head.text(plant.common_name);
                link.append(head);
                plantEl.append(link);
                if (plant.default_image) {
                    const plantImg = $("<img>");
                    plantImg.attr("src", plant.default_image.thumbnail);
                    plantEl.append(plantImg);
                }
                $("#plants").append(plantEl);
            }
    })
})