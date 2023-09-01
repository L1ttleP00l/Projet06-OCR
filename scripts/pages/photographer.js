//Mettre le code JavaScript lié à la page photographer.html

function photographerTemplate(data) {
    const { name, id, city, country, tagline, price, portrait } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        let menu = document.getElementsByClassName("photograph-header")[0];
        // let button = document.getElementsByClassName("contact_button")[0];
        const div = document.createElement('div');
        div.setAttribute("class","text");
        const img = document.createElement('img');
        img.setAttribute("src", picture)
        img.setAttribute("alt", "Portrait de " + name)
        img.setAttribute("aria-label", "Sélection du photographe " + name)
        const h2 = document.createElement('h2');
        const pcity = document.createElement('p');
        pcity.setAttribute("class", "city")
        const ptagline = document.createElement('p')
        ptagline.setAttribute("class", "tagline")
        // const pprice = document.createElement('p')
        // pprice.setAttribute("class", "price")
        h2.textContent = name;
        pcity.textContent = city + ", " + country
        ptagline.textContent = tagline
        // pprice.textContent = price + "€/jour"
        menu.prepend(div)
        menu.append(img)
        // div.appendChild(img);
        div.appendChild(h2);
        div.appendChild(pcity);
        div.appendChild(ptagline);
        // div.appendChild(pprice);
        
        // Adds the photographer's name to the browser tab
        document.getElementById("title").innerText = "Fisheye - " + (name.split('')[0]) + ". " + (name.split(' ')[1]);

        // document.getElementById("contact").innerText = "Contactez-moi\n" + name;


        return (div);
    }
    return { name, picture, getUserCardDOM }
}



// Récupère les informations concernant les photographes depuis le fichier "photographers.json"
async function getPhotographers() {
    const response = await fetch("data/photographers.json")
    const data = await response.json()
    return data
}

async function displayData(photographers) {
    const photographersSection = document.querySelector(".photograph-header");
    // console.table(photographers)
    
    let id = new URL(document.location).searchParams.get('id');
    console.log(id)

    let photographer = photographers.find((photographer) => photographer.id.toString() === id);
    // console.log(photographer);

    const photographerModel = photographerTemplate(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    // photographersSection.appendChild(userCardDOM);
    // console.log(photographerModel)
}

async function init() {
    // Récupère les datas des photographes
    const { photographers } = await getPhotographers();
    displayData(photographers);
}

init();