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
        document.title = "Fisheye - " + (name.split('')[0]) + ". " + (name.split(' ')[1]);

        document.getElementById("contact").innerText = "Contactez-moi\n" + name;

        // var contactHeader = document.getElementById("contact"); // Récupère l'élément h2 par son ID

        // var paragraphElement = document.createElement("h2");
        // paragraphElement.textContent = name; // Remplacez "Votre texte ici" par le texte que vous souhaitez ajouter

        // contactHeader.insertAdjacentElement("afterend", paragraphElement);



        return (div);
    }
    return { name, picture, getUserCardDOM }
}



// Retrieves photographer information from the file "photographers.json"
async function getPhotographers() {
    const response = await fetch("data/photographers.json")
    const data = await response.json()
    // console.table(data);
    return data
}

async function displayData(photographers) {
    const photographersSection = document.querySelector(".photograph-header");
    // console.table(photographers)
    
    let id = new URL(document.location).searchParams.get('id');
    // console.log(id)

    let photographer = photographers.find((photographer) => photographer.id.toString() === id);
    // console.log(photographer);

    const photographerModel = photographerTemplate(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
}

async function init() {
    // Recovers data from photographers
    const { photographers, media } = await getPhotographers();
    // Recovers media from photographers
    // console.table(photographers);
    // console.table(media);
    displayData(photographers);
    displayMedia(media);
}

init();


async function displayMedia(media) {
    const dataSection = document.querySelector(".media");

    // Get photographer ID from URL
    let id = new URL(document.location).searchParams.get('id');
    
    // Find the corresponding media whose "photographerId" corresponds to the photographer's ID
    let mediaItems = media.filter((item) => item.photographerId.toString() === id);

    for (let index = 0; index < mediaItems.length; index++) {
        const mediaItem = mediaItems[index]
        const dataModel = dataTemplate(mediaItem, mediaItems, index);
        const dataCardDOM = dataModel.getDataCardDOM();
        dataSection.appendChild(dataCardDOM);
    }
}

function dataTemplate(mediaItem, mediaList, index) {
    const { id, photographerId, title, image, video, likes, date, price } = mediaItem;

    function getDataCardDOM() {
        const mediaContainer = document.createElement("div");
        mediaContainer.classList.add("media-item");


        if (image) {
            // If it's an image, create an <img> element
            const imageElement = document.createElement("img");
            imageElement.src = `assets/images/${photographerId}/${image}`;
            imageElement.alt = title;
            imageElement.addEventListener("click", () => openLightbox(imageElement.src, mediaList, index));
            mediaContainer.appendChild(imageElement);

            // Create a div for the title and likes
            const infoDiv = document.createElement("div");
            infoDiv.classList.add("media-info");

            // Add image name
            const imageNameElement = document.createElement("p");
            imageNameElement.textContent = title;

            // Create a div for likes and the icon
            const likeDiv = document.createElement("div");
            likeDiv.classList.add("like");

            // Adds the number of likes
            const likesElement = document.createElement("p");
            likesElement.textContent = `${likes}`;

            // Adds Font Awesome icon for likes
            const likesIconElement = document.createElement("i");
            likesIconElement.classList.add("fas", "fa-heart");

            // Adds title and likes to info div
            infoDiv.appendChild(imageNameElement);
            infoDiv.appendChild(likeDiv);
            likeDiv.appendChild(likesElement);
            likeDiv.appendChild(likesIconElement);

            // Adds the information div to the main container
            mediaContainer.appendChild(infoDiv);
        } else if (video) {
            // If it's a video, create a <video> element
            const videoElement = document.createElement("video");
            videoElement.src = `assets/images/${photographerId}/${video}`;
            videoElement.controls = false;
            videoElement.addEventListener("click", () => openLightbox(videoElement.src, mediaList, index));
            mediaContainer.appendChild(videoElement);

            // Create a div for likes and the icon
            const infoDiv = document.createElement("div");
            infoDiv.classList.add("media-info");

            // Add video name
            const videoNameElement = document.createElement("p");
            videoNameElement.textContent = title;

            // Create a div for likes and the icon
            const likeDiv = document.createElement("div");
            likeDiv.classList.add("like");

            // Adds the number of likes
            const likesElement = document.createElement("p");
            likesElement.textContent = `${likes}`;

            // Adds Font Awesome icon for likes
            const likesIconElement = document.createElement("i");
            likesIconElement.classList.add("fas", "fa-heart");

            // Adds title and likes to info div
            infoDiv.appendChild(videoNameElement);
            infoDiv.appendChild(likeDiv);
            likeDiv.appendChild(likesElement);
            likeDiv.appendChild(likesIconElement);

            // Adds the information div to the main container
            mediaContainer.appendChild(infoDiv);
        }

        return mediaContainer;
    }

    return { getDataCardDOM };
}