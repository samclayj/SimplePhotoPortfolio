fetch("header.html")
  .then(stream => stream.text())
  .then(text => define(text));


function define(html) {
  class CustomHeader extends HTMLElement {
    constructor() {
      super();
      const shadow = this.attachShadow({ mode: 'open' });
      shadow.innerHTML = html;

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
}


