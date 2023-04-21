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

const MOBILE_WIDTH = 1000;

const debounce = (callback, wait) => {
  let timeoutId = null;
  return (...args) => {
    window.clearTimeout(timeoutId);
    timeoutId = window.setTimeout(() => {
      callback.apply(null, args);
    }, wait);
  };
}

function getUrl(imagePath, width) {
  const galleryName = 'fear_of_water';
  return `static/${galleryName}/${imagePath}?nf_resize=fit&w=${Math.round(width * .9)}`;
  return "url('static/fear_of_water/" + imagePath + "?nf_resize=fit&w=" + Math.round(width * .9) + "')";
}

function getCssUrl(imagePath) {
  return `url('${getUrl(imagePath)}')`;
}


fetch("portfolio.html")
  .then(stream => stream.text())
  .then(text => definePortfolio(text));

function definePortfolio(html) {
  class CustomPortfolio extends HTMLElement {
    constructor() {
      super();
      const shadow = this.attachShadow({ mode: 'open' });
      shadow.innerHTML = html;

      this.mobileElements = [];
      this.galleryElement = this.shadowRoot.getElementById('gallery');
      this.currentGallery = fearOfWater;
      this.galleryIndex = 0;
      this.lastLoaded = 0;

      // Use this to resize the images as needed.
      this.width = window.innerWidth;

      this.shadowRoot.querySelector('.footer-left')
        .addEventListener('click', e => {this.nextImage()});
      this.shadowRoot.querySelector('.footer-right')
        .addEventListener('click', e => {this.prevImage()});
      document.addEventListener('keydown', e => this.arrowKeyNav(e))
      window.addEventListener('scroll', debounce(e => {
        console.log('scroll');
        this.fadeIn();
      }, 10));
      window.addEventListener('resize', debounce(e => {
        console.log('resize');
        if (window.innerWidth != this.width) {
          this.width = window.innerWidth;
          this.init(1000);
        }
      }, 250));

      // Also need to fix the arrow key nav.
    }

    connectedCallback() {
      this.galleryIndex = 0;
      this.galleryElement = this.shadowRoot.getElementById('gallery');
      this.setImage(this.currentGallery[0]);
      this.init(1500);
    }

    isMobile() {
      return this.width <= MOBILE_WIDTH;
    }

    /**
     * Netlify CDN/LMS doesn't seemt to cache images with this low request level.
     * https://answers.netlify.com/t/netlify-large-media-ttfb/48948/13
     * Try to preload the images to optimize.
     */
    preloadImages() {
      let preload1 = this.shadowRoot.getElementById('pre1');
      let preload2 = this.shadowRoot.getElementById('pre2');
      let preload3 = this.shadowRoot.getElementById('pre3');
      let preload4 = this.shadowRoot.getElementById('pre4');
      preload1.style.backgroundImage = getCssUrl(this.currentGallery[this.incrementPreloadIndex()]);
      preload2.style.backgroundImage = getCssUrl(this.currentGallery[this.incrementPreloadIndex()]);
      preload3.style.backgroundImage = getCssUrl(this.currentGallery[this.incrementPreloadIndex()]);
      preload4.style.backgroundImage = getCssUrl(this.currentGallery[this.incrementPreloadIndex()]);

    }

    setImage(imagePath) {
      this.galleryElement.classList.remove('fade');
      this.galleryElement.style.backgroundImage = getCssUrl(imagePath);
      setTimeout(() => {
        this.galleryElement.classList.add('fade');
      }, 100);
    }

    incrementPreloadIndex() {
      this.lastLoaded = (this.lastLoaded + 1) % this.currentGallery.length;
      return this.lastLoaded;
    }

    getNextIndex() {
      return (this.galleryIndex + 1) % this.currentGallery.length;
    }

    nextImage() {
      this.galleryIndex = this.getNextIndex();
      this.setImage(this.currentGallery[this.galleryIndex]);
      if (this.galleryIndex == this.lastLoaded) {
        this.preloadImages();
      }
    }

    prevImage() {
      this.galleryIndex = this.galleryIndex != 0 ? this.galleryIndex - 1 : this.currentGallery.length - 1;
      this.setImage(this.currentGallery[this.galleryIndex]);
    }

    arrowKeyNav(e) {
      if (e.keyCode == '37') {
        // left arrow
        this.prevImage();
      }
      else if (e.keyCode == '39') {
        // right arrow
        this.nextImage();
      }
    }

    configureMobileGallery(delay) {
      const container = this.shadowRoot.querySelector('.mobile-container');
      container.innerHTML = '';
      for (const imagePath of this.currentGallery) {
        console.log(`Adding image ${imagePath}`);
        const image = new Image();
        image.loading = 'lazy';
        image.src = getUrl(imagePath, this.width);
        image.classList.add('mobile-image');
        container.appendChild(image);
        this.mobileElements.push(image);
      }
      setTimeout(() => {
        this.fadeIn();
      }, delay);
    }

    init(delay) {
      if (this.isMobile()) {
        // Configure gallery with images appended to DOM.
        this.configureMobileGallery(delay);
      } else {
        // Configure gallery with paginated images.
        this.preloadImages();
      }
    }

    fadeIn() {
      for (const el of this.mobileElements) {
        const distInView = el.getBoundingClientRect().top - window.innerHeight + 20;
        if (distInView < 0) {
          el.classList.add("fade");
        } else {
          el.classList.remove("fade");
        }
      }
    }
  }

  window.customElements.define('custom-portfolio', CustomPortfolio);
}
