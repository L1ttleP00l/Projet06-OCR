//Mettre le code JavaScript lié à la page photographer.html

function photographerTemplate(data) {
    const { name, id, city, country, tagline, price, portrait } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        let menu = document.getElementsByClassName("photograph-header")[0];
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
        h2.textContent = name;
        pcity.textContent = city + ", " + country
        ptagline.textContent = tagline
        menu.prepend(div)
        menu.append(img)
        div.appendChild(h2);
        div.appendChild(pcity);
        div.appendChild(ptagline);
        
        // Adds the photographer's name to the browser tab
        document.title = "Fisheye - " + (name.split('')[0]) + ". " + (name.split(' ')[1]);

        document.getElementById("contact").innerText = "Contactez-moi\n" + name;

        return (div);
    }
    return { name, picture, getUserCardDOM }
}

async function getPhotographers() {
    try {
        const response = await fetch("data/photographers.json");
        if (!response.ok) {
            throw new Error("Network response was not ok: " + response.statusText);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Fetch error: ", error);
    }
}

async function displayData(photographers) {
    const photographersSection = document.querySelector(".photograph-header");
    
    let id = new URL(document.location).searchParams.get('id');
    let photographer = photographers.find((photographer) => photographer.id.toString() === id);

    const photographerModel = photographerTemplate(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();

    addPriceBox(photographer.price);
}

async function init() {
    const { photographers, media } = await getPhotographers();
    displayData(photographers);
    displayMedia(media);
}

init();

async function displayMedia(media) {
    const dataSection = document.querySelector(".media");

    let id = new URL(document.location).searchParams.get('id');

    let mediaItems = media.filter((item) => item.photographerId.toString() === id);

    for (let index = 0; index < mediaItems.length; index++) {
        const mediaItem = mediaItems[index];
        const dataModel = dataTemplate(mediaItem, mediaItems, index);
        const dataCardDOM = dataModel.getDataCardDOM();
        dataSection.appendChild(dataCardDOM);
    }

    updateTotalLikesCount(); // Appel initial pour mettre à jour le compteur total de likes
}

function dataTemplate(mediaItem, mediaList, index) {
    const { id, photographerId, title, image, video, likes, date, price } = mediaItem;

    function getDataCardDOM() {
        const mediaContainer = document.createElement("div");
        mediaContainer.classList.add("media-item");

        if (image) {
            const imageElement = document.createElement("img");
            imageElement.src = `assets/images/${photographerId}/${image}`;
            imageElement.alt = title;
            imageElement.tabIndex = 0;
            imageElement.setAttribute("role", "button");

            // Ajoutez le gestionnaire d'événements pour la touche "Entrée" ici
            imageElement.addEventListener("keydown", (event) => {
                if (event.key === "Enter") {
                    openLightbox(imageElement.src, mediaList, index);
                }
            });

            const infoDiv = document.createElement("div");
            infoDiv.classList.add("media-info");
            infoDiv.setAttribute("data-likes", likes);
            infoDiv.setAttribute("data-liked", "false");

            const imageNameElement = document.createElement("p");
            imageNameElement.textContent = title;

            const likeDiv = document.createElement("div");
            likeDiv.classList.add("like");

            const likesElement = document.createElement("p");
            likesElement.textContent = `${likes}`;

            const likesIconElement = document.createElement("i");
            likesIconElement.classList.add("fas", "fa-heart");

            likeDiv.addEventListener("click", () => {
                const currentLikes = parseInt(infoDiv.getAttribute("data-likes"));
                const liked = infoDiv.getAttribute("data-liked") === "true";

                if (liked) {
                    // Retirer un like
                    infoDiv.setAttribute("data-likes", currentLikes - 1);
                    infoDiv.setAttribute("data-liked", "false");
                } else {
                    // Ajouter un like
                    infoDiv.setAttribute("data-likes", currentLikes + 1);
                    infoDiv.setAttribute("data-liked", "true");
                }

                likesElement.textContent = `${parseInt(infoDiv.getAttribute("data-likes"))}`;
                updateTotalLikesCount(); // Mettre à jour le compteur total de likes
            });

            infoDiv.appendChild(imageNameElement);
            infoDiv.appendChild(likeDiv);
            likeDiv.appendChild(likesElement);
            likeDiv.appendChild(likesIconElement);

            mediaContainer.appendChild(imageElement);
            mediaContainer.appendChild(infoDiv);

            // Ajouter le gestionnaire de clic pour ouvrir la lightbox
            imageElement.addEventListener("click", () => openLightbox(imageElement.src, mediaList, index));

        } else if (video) {
            const videoElement = document.createElement("video");
            videoElement.src = `assets/images/${photographerId}/${video}`;
            videoElement.controls = false;
            videoElement.tabIndex = 0;
            videoElement.setAttribute("role", "button");

            // Ajoutez le gestionnaire d'événements pour la touche "Entrée" ici
            videoElement.addEventListener("keydown", (event) => {
                if (event.key === "Enter") {
                    openLightbox(videoElement.src, mediaList, index);
                }
            });

            const infoDiv = document.createElement("div");
            infoDiv.classList.add("media-info");
            infoDiv.setAttribute("data-likes", likes);
            infoDiv.setAttribute("data-liked", "false");

            const videoNameElement = document.createElement("p");
            videoNameElement.textContent = title;

            const likeDiv = document.createElement("div");
            likeDiv.classList.add("like");

            const likesElement = document.createElement("p");
            likesElement.textContent = `${likes}`;

            const likesIconElement = document.createElement("i");
            likesIconElement.classList.add("fas", "fa-heart");

            likeDiv.addEventListener("click", () => {
                const currentLikes = parseInt(infoDiv.getAttribute("data-likes"));
                const liked = infoDiv.getAttribute("data-liked") === "true";

                if (liked) {
                    // Retirer un like
                    infoDiv.setAttribute("data-likes", currentLikes - 1);
                    infoDiv.setAttribute("data-liked", "false");
                } else {
                    // Ajouter un like
                    infoDiv.setAttribute("data-likes", currentLikes + 1);
                    infoDiv.setAttribute("data-liked", "true");
                }

                likesElement.textContent = `${parseInt(infoDiv.getAttribute("data-likes"))}`;
                updateTotalLikesCount(); // Mettre à jour le compteur total de likes
            });

            infoDiv.appendChild(videoNameElement);
            infoDiv.appendChild(likeDiv);
            likeDiv.appendChild(likesElement);
            likeDiv.appendChild(likesIconElement);

            mediaContainer.appendChild(videoElement);
            mediaContainer.appendChild(infoDiv);

            // Ajouter le gestionnaire de clic pour ouvrir la lightbox
            videoElement.addEventListener("click", () => openLightbox(videoElement.src, mediaList, index));
        }

        return mediaContainer;
    }

    return { getDataCardDOM };
}

function calculateTotalLikes(mediaItems) {
    let totalLikes = 0;
    mediaItems.forEach(item => {
        totalLikes += item.likes;
    });
    return totalLikes;
}

function updateTotalLikesBox(mediaItems) {
    const totalLikes = calculateTotalLikes(mediaItems);
    const boxElement = document.querySelector('.box');
    if (boxElement) {
        const likesContainer = document.createElement('div');
        likesContainer.classList.add('likes-container');

        const likesText = document.createElement('span');
        likesText.textContent = `${totalLikes} `;
        likesContainer.appendChild(likesText);

        const heartIcon = document.createElement('i');
        heartIcon.classList.add('fas', 'fa-heart');
        likesContainer.appendChild(heartIcon);

        boxElement.prepend(likesContainer);
    }
}

function addPriceBox(price) {
    const boxElement = document.querySelector('#price');
    if (boxElement) {
        boxElement.textContent = `${price}€ / jour`;
    }
}

let totalLikesCount = 0;

function updateTotalLikesCount() {
    const mediaItems = document.querySelectorAll(".media-info");
    let newTotalLikesCount = 0;

    mediaItems.forEach((mediaItem) => {
        newTotalLikesCount += parseInt(mediaItem.getAttribute("data-likes"));
    });

    totalLikesCount = newTotalLikesCount;
    const totalLikesElement = document.getElementById("totallikes");
    if (totalLikesElement) {
        totalLikesElement.innerHTML = `${totalLikesCount} likes <i class="fas fa-heart"></i>`;
    }
}