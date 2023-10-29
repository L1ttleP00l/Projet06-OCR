let currentMediaList = null;
let currentIndex = null;

// Function to open the lightbox
function openLightbox(mediaSrc, mediaList, index) {
    const media = mediaList[index];
    const lightboxOverlay = document.querySelector('.lightbox-overlay');
    const lightboxContent = document.querySelector('.lightbox-content');
    const lightboxMediaContainer = document.getElementById('lightbox-media-container');
    const lightboxTitle = document.getElementById('lightbox-title');

    const mediaElement = mediaSrc.endsWith('.mp4')
        ? createVideoElement(mediaSrc)
        : createImageElement(mediaSrc);

    lightboxMediaContainer.innerHTML = '';
    lightboxMediaContainer.appendChild(mediaElement);
    lightboxTitle.textContent = media.title;

    // Set aria-label with the title of the media element
    lightboxTitle.setAttribute('aria-label', media.title);

    lightboxOverlay.style.display = 'block';
    lightboxContent.style.display = 'block';

    document.body.style.overflow = 'hidden';

    lightboxContent.style.left = '50%';

    const currentScroll = window.scrollY || document.documentElement.scrollTop;
    lightboxContent.style.top = `${currentScroll + (window.innerHeight / 2)}px`;

    currentMediaList = mediaList;
    currentIndex = index;

    document.getElementById('lightbox-arrow-left').addEventListener('click', () => previousElement(currentMediaList, currentIndex));
    document.getElementById('lightbox-arrow-right').addEventListener('click', () => nextElement(currentMediaList, currentIndex));

    // Disable all other interactive elements outside the lightbox
    document.querySelectorAll('a, button, input, textarea').forEach(elem => {
        if (!lightboxContent.contains(elem)) {
            elem.setAttribute('tabindex', '-1');
        }
    });

    // Enable all interactive elements inside the lightbox
    lightboxContent.querySelectorAll('i, button').forEach(elem => {
        elem.setAttribute('tabindex', '0');
    });

    document.addEventListener("keydown", handleKeydown);
    document.addEventListener("keydown", trapFocusInsideLightbox);

    const focusableElems = Array.from(document.querySelector('.lightbox-content').querySelectorAll('[tabindex="0"]'));
    if (focusableElems.length > 0) {
        focusableElems[0].focus();
    }
    
    if (mediaSrc.endsWith('.mp4')) {
        setTimeout(() => {
            videoElement.focus();
        }, 100);
    }
    
    // Get the close button for the lightbox
    const closeButton = document.getElementById('lightbox-close-button');

    // Add an event handler for the close button
    closeButton.addEventListener('click', closeLightbox);

    // Add an aria-label attribute for the close button
    closeButton.setAttribute('aria-label', 'Fermer la galerie');

    // Get the previous and next buttons
    const prevButton = document.getElementById('lightbox-arrow-left');
    const nextButton = document.getElementById('lightbox-arrow-right');

    // Add aria-label attributes to the previous and next buttons
    prevButton.setAttribute('aria-label', 'Précédent');
    nextButton.setAttribute('aria-label', 'Suivant');
}

// Function to create an image element
function createImageElement(imageSrc) {
    const imageElement = document.createElement('img');
    imageElement.src = imageSrc;
    return imageElement;
}

// Function to create a video element
function createVideoElement(videoSrc) {
    const videoElement = document.createElement('video');
    videoElement.tabIndex = 0;
    videoElement.src = videoSrc;
    videoElement.controls = true;
    const sourceElement = document.createElement('source');
    sourceElement.src = videoSrc;
    sourceElement.type = 'video/mp4';
    videoElement.appendChild(sourceElement);
    return videoElement;
}

// Function to close the lightbox
function closeLightbox() {
    // Select the lightbox DOM elements
    const lightboxOverlay = document.querySelector('.lightbox-overlay');
    const lightboxContent = document.querySelector('.lightbox-content');

    // Hide the lightbox
    lightboxOverlay.style.display = 'none';
    lightboxContent.style.display = 'none';

    // Restore scrolling of the background content
    document.body.style.overflow = 'auto';

    // Remove navigation button event handlers
    document.getElementById('lightbox-arrow-left').removeEventListener('click', () => previousElement(currentMediaList, currentIndex));
    document.getElementById('lightbox-arrow-right').removeEventListener('click', () => nextElement(currentMediaList, currentIndex));

    // Enable all other interactive elements outside the lightbox
    enableOutsideInteractiveElements();

    // Disable interactive elements inside the lightbox
    disableInsideInteractiveElements();

    // Remove keyboard event handlers
    document.removeEventListener("keydown", handleKeydown);
    document.removeEventListener("keydown", trapFocusInsideLightbox);
}

// Function to handle keyboard input
function handleKeydown(event) {
    switch(event.key) {
        case "ArrowLeft":
            previousElement(currentMediaList, currentIndex);
            break;
        case "ArrowRight":
            nextElement(currentMediaList, currentIndex);
            break;
        case "Escape":
            closeLightbox();
            break;
    }
}

// Function to change the media
function changeMedia(mediaList, index) {
    const media = mediaList[index];
    const mediaSrc = media.video ? `assets/images/${media.photographerId}/${media.video}` : `assets/images/${media.photographerId}/${media.image}`;
    const mediaElement = media.video ? createVideoElement(mediaSrc) : createImageElement(mediaSrc);

    const lightboxMediaContainer = document.getElementById('lightbox-media-container');
    const lightboxTitle = document.getElementById('lightbox-title');

    lightboxMediaContainer.innerHTML = '';
    lightboxMediaContainer.appendChild(mediaElement);
    lightboxTitle.textContent = media.title;

    // Set aria-label with the title of the media element
    lightboxTitle.setAttribute('aria-label', media.title);
}

// Function to go to the previous media
function previousElement(mediaList, index) {
    let newIndex = index === 0 ? mediaList.length - 1 : index - 1;
    changeMedia(mediaList, newIndex);
    currentIndex = newIndex; // Update the global index
}

// Function to go to the next media
function nextElement(mediaList, index) {
    let newIndex = index === mediaList.length - 1 ? 0 : index + 1;
    changeMedia(mediaList, newIndex);
    currentIndex = newIndex; // Update the global index
}

// Function to handle keyboard navigation inside the lightbox
function trapFocusInsideLightbox(event) {
    if (event.key !== "Tab") return;

    const focusableElems = Array.from(document.querySelector('.lightbox-content').querySelectorAll('[tabindex="0"]'));
    const firstFocusableElem = focusableElems[0];
    const lastFocusableElem = focusableElems[focusableElems.length - 1];

    if (event.shiftKey && document.activeElement === firstFocusableElem) {
        lastFocusableElem.focus();
        event.preventDefault();
    } else if (!event.shiftKey && document.activeElement === lastFocusableElem) {
        firstFocusableElem.focus();
        event.preventDefault();
    }
}

// Function to disable all interactive elements outside the lightbox
function disableOutsideInteractiveElements() {
    document.querySelectorAll('a, button, input, textarea').forEach(elem => {
        if (!document.querySelector('.lightbox-content').contains(elem)) {
            elem.setAttribute('tabindex', '-1');
            elem.setAttribute('aria-hidden', 'true');
        }
    });
}

// Function to enable all interactive elements outside the lightbox
function enableOutsideInteractiveElements() {
    document.querySelectorAll('[tabindex="-1"]').forEach(elem => {
        elem.removeAttribute('tabindex');
        elem.removeAttribute('aria-hidden');
    });
}

// Function to enable all interactive elements inside the lightbox
function enableInsideInteractiveElements() {
    document.querySelector('.lightbox-content').querySelectorAll('i, button').forEach(elem => {
        elem.setAttribute('tabindex', '0');
        elem.removeAttribute('aria-hidden');
    });
}

// Function to disable all interactive elements inside the lightbox
function disableInsideInteractiveElements() {
    document.querySelector('.lightbox-content').querySelectorAll('i, button').forEach(elem => {
        elem.setAttribute('tabindex', '-1');
        elem.setAttribute('aria-hidden', 'true');
    });
}

// Function to set initial focus within the lightbox
function setInitialFocus() {
    const focusableElems = Array.from(document.querySelector('.lightbox-content').querySelectorAll('[tabindex="0"]'));
    if (focusableElems.length > 0) {
        focusableElems[0].focus();
    }
}

// Event handlers for action buttons
const closeButton = document.getElementById('lightbox-close-button');
closeButton.addEventListener('keydown', (event) => {
    if (event.key === "Enter") {
        closeLightbox();
    }
});

const leftArrow = document.getElementById('lightbox-arrow-left');
leftArrow.addEventListener('keydown', (event) => {
    if (event.key === "Enter") {
        previousElement(currentMediaList, currentIndex);
    }
});

const rightArrow = document.getElementById('lightbox-arrow-right');
rightArrow.addEventListener('keydown', (event) => {
    if (event.key === "Enter") {
        nextElement(currentMediaList, currentIndex);
    }
});
