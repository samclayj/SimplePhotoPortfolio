/** List portfolios here. */
const fearOfWater = [
  'Meeting 5 - Sam Jentsch 01.webp',
  'Meeting 5 - Sam Jentsch 02.webp',
  'Meeting 5 - Sam Jentsch 03.webp',
  'Meeting 5 - Sam Jentsch 04.webp',
  'Meeting 5 - Sam Jentsch 05.webp',
  'Meeting 5 - Sam Jentsch 06.webp',
  'Meeting 5 - Sam Jentsch 07.webp',
  'Meeting 5 - Sam Jentsch 08.webp',
  'Meeting 5 - Sam Jentsch 09.webp',
  'Meeting 5 - Sam Jentsch 10.webp',
  'Meeting 5 - Sam Jentsch 11.webp',
  'Meeting 5 - Sam Jentsch 12.webp',
  'Meeting 5 - Sam Jentsch 13.webp',
];


// Add support for the mobile images. Probably rename.
const urbanBayou = [
  'Big Rich-1.webp',
  'Big Rich-2.webp',
  'Big Rich-3.webp',
  'Big Rich-4.webp',
  'Big Rich-5.webp',
  'Big Rich-6.webp',
  'Big Rich-7.webp',
  'Big Rich-8.webp',
  'Big Rich-9.webp',
  'Big Rich-10.webp',
  'Big Rich-11.webp',
  'Big Rich-12.webp',
  'Big Rich-13.webp',
  'Big Rich-14.webp',
  'Big Rich-15.webp',
  'Big Rich-16.webp',
  'Big Rich-17.webp',
  'Big Rich-18.webp',
  'Big Rich-19.webp',
  'Big Rich-20.webp',
  'Big Rich-21.webp',
];

const samRayburn = [
  'Sam Rayburn-1.webp',
  'Sam Rayburn-2.webp',
  'Sam Rayburn-3.webp',
  'Sam Rayburn-4.webp',
  'Sam Rayburn-5.webp',
  'Sam Rayburn-6.webp',
  'Sam Rayburn-7.webp',
  'Sam Rayburn-8.webp',
  'Sam Rayburn-9.webp',
  'Sam Rayburn-10.webp',
  'Sam Rayburn-11.webp',
  'Sam Rayburn-12.webp',
  'Sam Rayburn-13.webp',
];

const saltMarsh = [
  'Salt Marsh-1.webp',
  'Salt Marsh-2.webp',
  'Salt Marsh-3.webp',
  'Salt Marsh-4.webp',
  'Salt Marsh-5.webp',
  'Salt Marsh-6.webp',
  'Salt Marsh-7.webp',
];

const galleries = {
  'fear_of_water' : fearOfWater,
  'sam_rayburn' : samRayburn,
  'salt_marsh' : saltMarsh,
  'urban_bayou' : urbanBayou,
}

const MOBILE_WIDTH = 999;
const DESKTOP_WIDTH = 1000;

const debounce = (callback, wait) => {
  let timeoutId = null;
  return (...args) => {
    window.clearTimeout(timeoutId);
    timeoutId = window.setTimeout(() => {
      callback.apply(null, args);
    }, wait);
  };
}

function getImageUrl(galleryName, format, imagePath) {
  return `images/${galleryName}/${format}/${imagePath}`
}

function getCssUrl(galleryName, format, imagePath) {
  return `url('images/${galleryName}/${format}/${imagePath}')`
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

      const selectedGallery = this.attributes.gallery.value;
      this.galleryName = selectedGallery;
      this.currentGallery = galleries[selectedGallery];

      this.galleryIndex = 0;
      this.lastLoaded = 0;

      // Use this to resize the images as needed.
      this.width = window.innerWidth;

      this.shadowRoot.querySelector('.portfolio-container')
        .addEventListener('click', e => {
          this.nextImage();
        });
      this.shadowRoot.querySelector('.footer-left')
        .addEventListener('click', e => {
          this.prevImage();
          e.stopPropagation();
        });
      this.shadowRoot.querySelector('.footer-right')
        .addEventListener('click', e => {
          this.nextImage();
          e.stopPropagation();
        });
      document.addEventListener('keydown', e => this.arrowKeyNav(e))
      window.addEventListener('scroll', debounce(e => {
        this.fadeIn();
      }, 10));

      window.addEventListener('resize', debounce(e => {
        // Only resize if the mobile width boundary is crossed.
        if (this.width > MOBILE_WIDTH && window.innerWidth <= MOBILE_WIDTH) {
          this.width = window.innerWidth;
          this.init(1000);
        } else if (this.width <= MOBILE_WIDTH && window.innerWidth > MOBILE_WIDTH) {
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
      this.init(1000);
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
      preload1.style.backgroundImage = getCssUrl(this.galleryName, 'desktop', this.currentGallery[this.incrementPreloadIndex()]);
      preload2.style.backgroundImage = getCssUrl(this.galleryName, 'desktop', this.currentGallery[this.incrementPreloadIndex()]);
      preload3.style.backgroundImage = getCssUrl(this.galleryName, 'desktop', this.currentGallery[this.incrementPreloadIndex()]);
      preload4.style.backgroundImage = getCssUrl(this.galleryName, 'desktop', this.currentGallery[this.incrementPreloadIndex()]);
    }

    setImage(imagePath) {
      this.galleryElement.classList.remove('fade');
      if (this.isMobile()) {
        this.galleryElement.style.backgroundImage = getCssUrl(this.galleryName, 'mobile', imagePath);
      } else {
        this.galleryElement.style.backgroundImage = getCssUrl(this.galleryName, 'desktop', imagePath);
      }
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
      this.galleryIndex = this.galleryIndex != 0 ? this.galleryIndex - 1 :
        this.currentGallery.length - 1;
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
      // Ignore resize events if the min-width is already configured to a mobile
      // size.

      const container = this.shadowRoot.querySelector('.mobile-container');
      container.innerHTML = '';
      for (const imagePath of this.currentGallery) {
        const image = new Image();
        image.loading = 'lazy';
        image.src = getImageUrl(this.galleryName, 'mobile', imagePath);
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
