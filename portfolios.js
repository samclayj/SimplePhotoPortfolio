/** List portfolios here. */
const fearOfWater = [
    'Meeting 5 - Sam Jentsch 01.jpg',
    'Meeting 5 - Sam Jentsch 02.jpg',
    'Meeting 5 - Sam Jentsch 03.jpg',
    'Meeting 5 - Sam Jentsch 04.jpg',
    'Meeting 5 - Sam Jentsch 05.jpg',
    'Meeting 5 - Sam Jentsch 06.jpg',
    'Meeting 5 - Sam Jentsch 07.jpg',
    'Meeting 5 - Sam Jentsch 08.jpg',
    'Meeting 5 - Sam Jentsch 09.jpg',
    'Meeting 5 - Sam Jentsch 10.jpg',
    'Meeting 5 - Sam Jentsch 11.jpg',
    'Meeting 5 - Sam Jentsch 12.jpg',
    'Meeting 5 - Sam Jentsch 13.jpg',
];

let galleryElement;
let currentGallery = fearOfWater;
let galleryIndex = 0;
let lastLoaded = 0;
// Use this to resize the images as needed.
let width = window.innerWidth;

const MOBILE_WIDTH = 1000;

function isMobile() {
    console.log(`isMobile? ${width <= MOBILE_WIDTH}`);
    return width <= MOBILE_WIDTH;
}

document.onkeydown = arrowKeyNav;

/**
 * Netlify CDN/LMS doesn't seemt to cache images with this low request level.
 * https://answers.netlify.com/t/netlify-large-media-ttfb/48948/13
 * Try to preload the images to optimize.
 */
function preloadImages() {
    preload1 = document.getElementById('pre1');
    preload2 = document.getElementById('pre2');
    preload3 = document.getElementById('pre3');
    preload4 = document.getElementById('pre4');
    preload1.style.backgroundImage = getCssUrl(currentGallery[incrementPreloadIndex()]);
    preload2.style.backgroundImage = getCssUrl(currentGallery[incrementPreloadIndex()]);
    preload3.style.backgroundImage = getCssUrl(currentGallery[incrementPreloadIndex()]);
    preload4.style.backgroundImage = getCssUrl(currentGallery[incrementPreloadIndex()]);

}

function getUrl(imagePath) {
    const galleryName = 'fear_of_water';
    return `static/${galleryName}/${imagePath}?nf_resize=fit&w=${Math.round(width*.9)}`;
    return "url('static/fear_of_water/" + imagePath + "?nf_resize=fit&w=" + Math.round(width * .9) + "')";
}

function getCssUrl(imagePath) {
    return `url('${getUrl(imagePath)}')`;
}

function setImage(imagePath) {
    galleryElement.classList.remove('fade');
    galleryElement.style.backgroundImage = getCssUrl(imagePath);
    setTimeout(() => {
        galleryElement.classList.add('fade');
    }, 100);
}

function incrementPreloadIndex() {
    lastLoaded = (lastLoaded + 1) % currentGallery.length;
    return lastLoaded;
}

function getNextIndex() {
    return (galleryIndex + 1) % currentGallery.length;
}

function nextImage() {
    galleryIndex = getNextIndex();
    setImage(currentGallery[galleryIndex]);
    if (galleryIndex == lastLoaded) {
        preloadImages();
    }
}

function prevImage() {
    galleryIndex = galleryIndex != 0 ? galleryIndex - 1 : currentGallery.length - 1;
    setImage(currentGallery[galleryIndex]);
}

function arrowKeyNav(e) {
    if (e.keyCode == '37') {
       // left arrow
        prevImage();
    }
    else if (e.keyCode == '39') {
       // right arrow
        nextImage();
    }
}

let mobileElements = [];
function configureMobileGallery(delay) {
    console.log('Configure gallery...');
    const container = document.querySelector('.mobile-container');
    container.innerHTML = '';
    for (const imagePath of currentGallery) {
        console.log(`Adding image ${imagePath}`);
        const image = new Image();
        image.loading = 'lazy';
        image.src = getUrl(imagePath);
        image.classList.add('mobile-image');
        container.appendChild(image);
        mobileElements.push(image);
    }
    setTimeout(() => {
        fadeIn();
    }, delay);
}

function init(delay) {
    if (isMobile()) {
        // Configure gallery with images appended to DOM.
        configureMobileGallery(delay);
    } else {
        // Configure gallery with paginated images.
        preloadImages();
    }
}

const debounce = (callback, wait) => {
  let timeoutId = null;
  return (...args) => {
    window.clearTimeout(timeoutId);
    timeoutId = window.setTimeout(() => {
      callback.apply(null, args);
    }, wait);
  };
}

function expandHeader() {
    const nav = document.querySelector('.collapsible-nav')

    if (nav.classList.contains('expanded')) {
        nav.classList.remove('expanded');
    } else {
        nav.classList.add('expanded');
    }
}

window.onresize = debounce((ev) => {
    if (window.innerWidth != width) {
        width = window.innerWidth;
        init(500);
    }
}, 250);
 
window.onload = () => {
    galleryIndex = 0;
    galleryElement = document.getElementById('gallery');
    setImage(currentGallery[0]);
    init(1000);
}

window.addEventListener('scroll', fadeIn); 
function fadeIn() {
    for (const el of mobileElements) {
        const distInView = el.getBoundingClientRect().top - window.innerHeight + 20;
        if (distInView < 0) {
            el.classList.add("fade");
        } else {
            el.classList.remove("fade");
        }
    }
}
