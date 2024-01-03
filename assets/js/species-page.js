const formatProp = (prop) => prop.split('_').map((part) => {
    const letters = part.split('');
    letters[0] = letters[0].toUpperCase();
    return letters.join('');
}).join(' ');
const problems = ["dimension", "hardiness", "watering_general_benchmark", "sunlight", "propagation"];
const required = [
    "description",
    "dimension",
    "care_level",
    "growth_rate",
    "hardiness",
    "drought_tolerant",
    "watering_general_benchmark",
    "sunlight",
    "pruning_month",
    "salt_tolerant",
    "propagation",
    "invasive",
    "harvest_season"
];

$(document).ready(() => {
    const plantApiKey = "sk-w8gg6585d74096b923574";
    const genBlock = (data) => {
        const newBlock = $("<div></div>");
        newBlock.attr("id", data.id);
        const nameEl = $("<h1></h1>");
        nameEl.text(data.common_name);
        const qualList = $("<ul></ul>");
        
        for (let prop of required) {
            const newLi = $("<li></li>");
            const formattedProp = formatProp(prop);
            if (!problems.includes(prop))
                newLi.text(`${formattedProp}: ${data[prop]}`);
            else {
                switch (prop) {
                    case 'dimension':
                        newLi.text(data[prop]);
                        break;
                    case 'hardiness':
                        const {min, max} = data[prop];
                        const liText = min === max ? `${formattedProp}: Zone ${min}` : `${formattedProp}: Zone ${min} to Zone ${max}`;
                        newLi.text(liText);
                        break;
                    case 'watering_general_benchmark':
                        newLi.text(`${formattedProp}: ${data[prop].value} ${data[prop].unit}`);
                        break;
                    case 'sunlight':
                    case 'propagation':
                        newLi.text(`${formattedProp}: ${data[prop].join(", ")}`);
                        break;
                }
            }
            qualList.append(newLi);
        }
        $(newBlock).append(nameEl);
        if (data.default_image) {
            const imageEl = $("<img>");
            imageEl.attr("src", data.default_image.thumbnail);
            $(newBlock).append(imageEl);
        }
        $(newBlock).append(qualList);
        
        $(document.body).append(newBlock);
    }

    let requestOptions = {
    method: 'GET',
    redirect: 'follow'
    };
    
    const searchParams = new URLSearchParams(window.location.search);
    const plantId = Number(searchParams.get("id"));

    fetch(`https://perenual.com/api/species/details/${plantId}?key=${plantApiKey}`, requestOptions)
    .then((res) => {
        if (!res.ok)
            throw new Error("error occurred");
        return res.json();
    })
    .then((results) => genBlock(results))
    .catch(() => {
        const errTxt = $("<h1></h1>");
        errTxt.text("There was an error fetching the data.");
        $(document.body).append(errTxt);
    })
});