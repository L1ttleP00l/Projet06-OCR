// JavaScript code for photographer.html page

// Function to generate photographer's section
function photographerTemplate(data) {
    const { name, id, city, country, tagline, price, portrait } = data;

    // Construct the path for the photographer's portrait image
    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        let menu = document.getElementsByClassName("photograph-header")[0];
        const div = document.createElement('div');
        div.setAttribute("class", "text");
        const img = document.createElement('img');
        img.setAttribute("src", picture);
        img.setAttribute("alt", "Portrait of " + name);
        img.setAttribute("aria-label", "Sélection du photographe " + name);
        const h2 = document.createElement('h2');
        const pcity = document.createElement('p');
        pcity.setAttribute("class", "city");
        const ptagline = document.createElement('p');
        ptagline.setAttribute("class", "tagline");
        h2.textContent = name;
        pcity.textContent = city + ", " + country;
        ptagline.textContent = tagline;
        menu.prepend(div)
        menu.append(img)
        div.appendChild(h2);
        div.appendChild(pcity);
        div.appendChild(ptagline);

        // Add photographer's name to the browser tab
        document.title = "Fisheye - " + (name.split('')[0]) + ". " + (name.split(' ')[1]);

        // Update the "Contact me" button with photographer's name
        document.getElementById("contact").innerText = "Contactez-moi\n" + name;

        return (div);
    }
    return { name, picture, getUserCardDOM }
}

// Function to fetch photographers' data from JSON
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

// Function to display photographer's data on the page
async function displayData(photographers) {
    const photographersSection = document.querySelector(".photograph-header");

    // Get photographer's ID from URL query parameter
    let id = new URL(document.location).searchParams.get('id');
    let photographer = photographers.find((photographer) => photographer.id.toString() === id);

    const photographerModel = photographerTemplate(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();

    // Add the photographer's price to the price box
    addPriceBox(photographer.price);
}

// Initialize the page
async function init() {
    const { photographers, media } = await getPhotographers();
    displayData(photographers);
    displayMedia(media);
}

init();

// Function to display photographer's media on the page
async function displayMedia(media) {
    const dataSection = document.querySelector(".media");

    // Get photographer's ID from URL query parameter
    let id = new URL(document.location).searchParams.get('id');

    // Filter media items by photographer's ID
    let mediaItems = media.filter((item) => item.photographerId.toString() === id);

    for (let index = 0; index < mediaItems.length; index++) {
        const mediaItem = mediaItems[index];
        const dataModel = dataTemplate(mediaItem, mediaItems, index);
        const dataCardDOM = dataModel.getDataCardDOM();
        dataSection.appendChild(dataCardDOM);
    }

    // Initial call to update the total likes count
    updateTotalLikesCount();
}

// Function to generate HTML for media items
function dataTemplate(mediaItem, mediaList, index) {
    const { id, photographerId, title, image, video, likes, date, price } = mediaItem;

    function getDataCardDOM() {
        const mediaContainer = document.createElement("div");
        mediaContainer.classList.add("media-item");

        // Add a "data-date" attribute with the date from JSON
        mediaContainer.setAttribute("data-date", date);

        if (image) {
            const imageElement = document.createElement("img");
            imageElement.src = `assets/images/${photographerId}/${image}`;
            imageElement.alt = title;
            imageElement.tabIndex = 0;
            imageElement.setAttribute("role", "button");
            imageElement.setAttribute("aria-label", `Image : ${title}`);

            // Add event listener for "Enter" key to open the lightbox
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
                    // Remove a like
                    infoDiv.setAttribute("data-likes", currentLikes - 1);
                    infoDiv.setAttribute("data-liked", "false");
                } else {
                    // Add a like
                    infoDiv.setAttribute("data-likes", currentLikes + 1);
                    infoDiv.setAttribute("data-liked", "true");
                }

                likesElement.textContent = `${parseInt(infoDiv.getAttribute("data-likes"))}`;
                updateTotalLikesCount(); // Update the total likes count
            });

            infoDiv.appendChild(imageNameElement);
            infoDiv.appendChild(likeDiv);
            likeDiv.appendChild(likesElement);
            likeDiv.appendChild(likesIconElement);

            mediaContainer.appendChild(imageElement);
            mediaContainer.appendChild(infoDiv);

            // Add click event handler to open the lightbox
            imageElement.addEventListener("click", () => openLightbox(imageElement.src, mediaList, index));

        } else if (video) {
            const videoElement = document.createElement("video");
            videoElement.src = `assets/images/${photographerId}/${video}`;
            videoElement.controls = false;
            videoElement.tabIndex = 0;
            videoElement.setAttribute("role", "button");
            videoElement.setAttribute("aria-label", `Vidéo : ${title}`);

            // Add event listener for "Enter" key to open the lightbox
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
                    // Remove a like
                    infoDiv.setAttribute("data-likes", currentLikes - 1);
                    infoDiv.setAttribute("data-liked", "false");
                } else {
                    // Add a like
                    infoDiv.setAttribute("data-likes", currentLikes + 1);
                    infoDiv.setAttribute("data-liked", "true");
                }

                likesElement.textContent = `${parseInt(infoDiv.getAttribute("data-likes"))}`;
                updateTotalLikesCount(); // Update the total likes count
            });

            infoDiv.appendChild(videoNameElement);
            infoDiv.appendChild(likeDiv);
            likeDiv.appendChild(likesElement);
            likeDiv.appendChild(likesIconElement);

            mediaContainer.appendChild(videoElement);
            mediaContainer.appendChild(infoDiv);

            // Add click event handler to open the lightbox
            videoElement.addEventListener("click", () => openLightbox(videoElement.src, mediaList, index));
        }

        return mediaContainer;
    }

    return { getDataCardDOM };
}

// Function to calculate the total number of likes
function calculateTotalLikes(mediaItems) {
    let totalLikes = 0;
    mediaItems.forEach(item => {
        totalLikes += item.likes;
    });
    return totalLikes;
}

// Function to update the total likes box
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

// Function to add price information
function addPriceBox(price) {
    const boxElement = document.querySelector('#price');
    if (boxElement) {
        boxElement.textContent = `${price}€ / day`;
    }
}

// Variable to store total likes count
let totalLikesCount = 0;

// Function to update the total likes count
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

// Select the <select> element
const photoFilterSelect = document.getElementById("photoFilter");

// Select the section containing media items
const mediaSection = document.querySelector(".media");

// Listen for changes in the <select>
photoFilterSelect.addEventListener("change", () => {
    // Get the selected value
    const selectedValue = photoFilterSelect.value;

    // Get all media items
    const mediaItems = Array.from(mediaSection.querySelectorAll(".media-item"));

    // Sort media items based on the selected value
    if (selectedValue === "popularity") {
        // Sort by popularity (number of likes)
        mediaItems.sort((a, b) => {
            const likesA = parseInt(a.querySelector(".media-info").getAttribute("data-likes"));
            const likesB = parseInt(b.querySelector(".media-info").getAttribute("data-likes"));
            return likesB - likesA;
        });
    } else if (selectedValue === "date") {
        // Sort by date (creation order)
        mediaItems.sort((a, b) => {
            const dateA = new Date(a.getAttribute("data-date")); // Make sure "data-date" is correctly defined in your JSON
            const dateB = new Date(b.getAttribute("data-date")); // Make sure "data-date" is correctly defined in your JSON
            return dateB - dateA; // Sort from newest to oldest
        });
    } else if (selectedValue === "title") {
        // Sort by title
        mediaItems.sort((a, b) => {
            const titleA = a.querySelector("p").textContent;
            const titleB = b.querySelector("p").textContent;
            return titleA.localeCompare(titleB);
        });
    }

    // Remove existing media items
    mediaSection.innerHTML = "";

    // Add sorted media items to the section
    mediaItems.forEach((mediaItem) => {
        mediaSection.appendChild(mediaItem);
    });
});
