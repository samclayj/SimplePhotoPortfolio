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
// Use this to resize the images as needed.
let width = window.innerWidth;

document.onkeydown = arrowKeyNav;

function preloadImage(imagePath) {
    preload1 = document.getElementById('pre1');
    preload1.style.backgroundImage = getUrl(imagePath);
}

function getUrl(imagePath) {
    return "url('static/fear_of_water/" + imagePath + "?nf_resize=fit&w=" + Math.round(width * .9) + "')";
}

function setImage(imagePath) {
    galleryElement.style.backgroundImage = getUrl(imagePath);
}

function getNextIndex() {
    return (galleryIndex + 1) % currentGallery.length;
}

function nextImage() {
    galleryIndex = getNextIndex();
    setImage(currentGallery[galleryIndex]);
    preloadImage(currentGallery[getNextIndex()]);
}

function prevImage() {
    galleryIndex = galleryIndex != 0 ? galleryIndex - 1 : currentGallery.length - 1;
    setImage(currentGallery[galleryIndex]);
}

function arrowKeyNav(e) {
    console.log('checkling');
    if (e.keyCode == '37') {
       // left arrow
        prevImage();
    }
    else if (e.keyCode == '39') {
       // right arrow
        nextImage();
    }
}
 
window.onload = () => {
    console.log('sup');
    galleryIndex = 0;
    galleryElement = document.getElementById('gallery');
    setImage(currentGallery[0]);
}
