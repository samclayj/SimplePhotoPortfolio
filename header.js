const template = document.createElement('template');

template.innerHTML = `
<style>
.desktop {
  display: none;
}
.mobile {
    display: block;
}

header {
    z-index: 999;

    height: 5%;
    min-height: 40px;

    border-bottom: 1px solid black;
    background-color: var(--header-color);
    color: var(--header-font);
    margin: 0;
    position: fixed;
    top: 0;
    width: 100%;

    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: flex-start;
}

.current-page {
    font-style: italic;
}

.current-page:hover {
    text-decoration: underline;
}

.collapsible-nav > div > ul > li:hover {
    text-decoration: underline;
    cursor: pointer;
}


header > div {
  margin: auto;
}

.collapsible-nav {
    z-index: 999;
    opacity: 0.75;

    min-height: 40px;

    border-top: 1px solid black;
    background-color: var(--header-color);
    color: var(--header-font);
    margin: 0;
    position: fixed;
    top: 5%;
    width: 100%;

    display: none;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: flex-start;
}

.expanded {
    display: flex;
}

.collapsible-nav > div {
    border-bottom: 1px solid black;
    width: 100%;
    padding: 10px 20px;
}

a:visited, a:active, a:link,  a {
    color: black;
}
a {
    text-decoration: none;
}
a:hover {
    color: black;
    cursor: pointer;
    text-decoration: underline;
}

.header-left {
  text-align: left;
  width: 50%;
  padding-left: 20px;
}

.header-center {
  text-align: center;
  width: 60%;
}

.header-right {
  text-align: right;
  width: 50%;
  padding-right: 20px;
}

@media only screen and (min-width: 1000px) {
    .desktop {
        display: block;
    }
    .mobile {
        display: none;
    }

    .header-left {
        padding-left: 12px;
        width: 20%;
    }

    .header-right {
        padding-right: 12px;
        width: 20%;
    }

    header {
        height: 3%;
        min-height: 40px;
        font-size: 0.875em;
    }
}
</style>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
<header>
  <div class="header-left">
    Sam Jentsch
  </div>
  <div class="header-center desktop">
    <a data-page="home" href="./index.html">Fear of Water (Work in Progress)</a>
  </div>
  <div class="header-right">
      <a data-page="about" class="desktop" href="./about.html">About</a>
      <div class="mobile"><span class="material-symbols-outlined mobile">menu</span></div>
  </div>
  <div class="collapsible-nav mobile">
      <div>
          <p>Work in Progress</p>
          <ul>
              <li>
                  <a data-page="home" href="./index.html">Fear of Water</a>
              </li>
          </ul>
      </div>
      <div>
          <a data-page="about" href="./about.html">About</a>
      </div>
  </div>
</header>
`;

class CustomHeader extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    this.addEventListener('click', e => {
      this.expandHeader();
    });
  }

  highlightCurrentPage() {
    console.log('highlight current');
    const elements = this.shadowRoot.querySelectorAll(`[data-page=${this.attributes.page.value}`);
    console.log(elements);
    for (const element of elements) {
      element.classList.add('current-page');
    }
  }

  expandHeader(e) {
    const nav = this.shadowRoot.querySelector('.collapsible-nav')

    if (nav.classList.contains('expanded')) {
      nav.classList.remove('expanded');
    } else {
      nav.classList.add('expanded');
    }
  }

  connectedCallback() {
    this.highlightCurrentPage();
    console.log(window.location.href);
    console.log(window.location.pathname);
  }

  render() {
  }
}
window.customElements.define('custom-header', CustomHeader);


