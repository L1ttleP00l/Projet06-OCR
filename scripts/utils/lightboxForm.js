let currentMediaList = null;
let currentIndex = null;

function openLightbox(mediaSrc, mediaList, index) {
    const media = mediaList[index]
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

    document.addEventListener("keydown", handleKeydown);
}

function createImageElement(imageSrc) {
    const imageElement = document.createElement('img');
    imageElement.src = imageSrc;
    return imageElement;
}

function createVideoElement(videoSrc) {
    const videoElement = document.createElement('video');
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

    document.removeEventListener("keydown", handleKeydown);
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
