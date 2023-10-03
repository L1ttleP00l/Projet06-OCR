function openLightbox(mediaSrc, title) {
    const lightboxOverlay = document.querySelector('.lightbox-overlay');
    const lightboxContent = document.querySelector('.lightbox-content');
    const lightboxMediaContainer = document.getElementById('lightbox-media-container');
    const lightboxTitle = document.getElementById('lightbox-title');

    // Create a new media element (either image or video)
    const mediaElement = mediaSrc.endsWith('.mp4')
        ? createVideoElement(mediaSrc)
        : createImageElement(mediaSrc);

    lightboxMediaContainer.innerHTML = '';
    lightboxMediaContainer.appendChild(mediaElement);
    lightboxTitle.textContent = title;

    // Afficher la lightbox
    lightboxOverlay.style.display = 'block';
    lightboxContent.style.display = 'block';

    // Désactiver le défilement en arrière-plan
    document.body.style.overflow = 'hidden';

    // Centrer la lightbox horizontalement
    lightboxContent.style.left = '50%';

    // Centrer la lightbox verticalement par rapport à la position actuelle de la page
    const currentScroll = window.scrollY || document.documentElement.scrollTop;
    lightboxContent.style.top = `${currentScroll + (window.innerHeight / 2)}px`;
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

    // Cacher la lightbox
    lightboxOverlay.style.display = 'none';
    lightboxContent.style.display = 'none';

    // Réactiver le défilement en arrière-plan
    document.body.style.overflow = 'auto';
}
