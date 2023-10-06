function openLightbox(mediaSrc, mediaList, index) {
    const media = mediaList[index]
    const lightboxOverlay = document.querySelector('.lightbox-overlay');
    const lightboxContent = document.querySelector('.lightbox-content');
    const lightboxMediaContainer = document.getElementById('lightbox-media-container');
    const lightboxTitle = document.getElementById('lightbox-title');

    console.log(mediaList[index])

    // Create a new media element (either image or video)
    const mediaElement = mediaSrc.endsWith('.mp4')
        ? createVideoElement(mediaSrc)
        : createImageElement(mediaSrc);

    lightboxMediaContainer.innerHTML = '';
    lightboxMediaContainer.appendChild(mediaElement);
    lightboxTitle.textContent = media.title;

    // Display lightbox
    lightboxOverlay.style.display = 'block';
    lightboxContent.style.display = 'block';

    // Disable background scrolling
    document.body.style.overflow = 'hidden';

    // Center lightbox horizontally
    lightboxContent.style.left = '50%';

    // Center lightbox vertically in relation to current page position
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

    // Hide lightbox
    lightboxOverlay.style.display = 'none';
    lightboxContent.style.display = 'none';

    // Re-enable background scrolling
    document.body.style.overflow = 'auto';
}

function previousElement(mediaList, index) {
    let newIndex = index
    if (index===0) {
        newIndex = mediaList.length-1
    } else {
        newIndex = index-1
    }

    const newMedia = mediaList[newIndex]
}

function nextElement(mediaList, index) {
    let newIndex = index
    if (index===mediaList.length-1) {
        newIndex = 0
    } else {
        newIndex = index+1
    }

    const newMedia = mediaList[newIndex]
}