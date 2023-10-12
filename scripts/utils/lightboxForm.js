let currentMediaList = null;
let currentIndex = null;

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
    
}

function createImageElement(imageSrc) {
    const imageElement = document.createElement('img');
    imageElement.src = imageSrc;
    return imageElement;
}

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

function closeLightbox() {
    const lightboxOverlay = document.querySelector('.lightbox-overlay');
    const lightboxContent = document.querySelector('.lightbox-content');

    lightboxOverlay.style.display = 'none';
    lightboxContent.style.display = 'none';

    document.body.style.overflow = 'auto';

    document.getElementById('lightbox-arrow-left').removeEventListener('click', () => previousElement(currentMediaList, currentIndex));
    document.getElementById('lightbox-arrow-right').removeEventListener('click', () => nextElement(currentMediaList, currentIndex));

    // Enable all other interactive elements outside the lightbox
    document.querySelectorAll('[tabindex="-1"]').forEach(elem => {
        elem.removeAttribute('tabindex');
    });
    

    // Disable all interactive elements inside the lightbox
    lightboxContent.querySelectorAll('i, button').forEach(elem => {
        elem.setAttribute('tabindex', '-1');
    });

    document.removeEventListener("keydown", handleKeydown);
    document.removeEventListener("keydown", trapFocusInsideLightbox);

}

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

function changeMedia(mediaList, index) {
    const media = mediaList[index];
    const mediaSrc = media.video ? `assets/images/${media.photographerId}/${media.video}` : `assets/images/${media.photographerId}/${media.image}`;
    const mediaElement = media.video ? createVideoElement(mediaSrc) : createImageElement(mediaSrc);

    const lightboxMediaContainer = document.getElementById('lightbox-media-container');
    const lightboxTitle = document.getElementById('lightbox-title');

    lightboxMediaContainer.innerHTML = '';
    lightboxMediaContainer.appendChild(mediaElement);
    lightboxTitle.textContent = media.title;
}

function previousElement(mediaList, index) {
    let newIndex = index === 0 ? mediaList.length - 1 : index - 1;
    changeMedia(mediaList, newIndex);
    currentIndex = newIndex; // Update the global index to the new value
}

function nextElement(mediaList, index) {
    let newIndex = index === mediaList.length - 1 ? 0 : index + 1;
    changeMedia(mediaList, newIndex);
    currentIndex = newIndex; // Update the global index to the new value
}

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

