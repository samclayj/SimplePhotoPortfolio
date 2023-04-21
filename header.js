fetch("header.html")
  .then(stream => stream.text())
  .then(text => define(text));


function define(html) {
  class CustomHeader extends HTMLElement {
    constructor() {
      super();
      const shadow = this.attachShadow({ mode: 'open' });
      shadow.innerHTML = html;

      this.shadowRoot.querySelector('.hamburger-button')
        .addEventListener('click', e => {
          this.expandHeader();
        });
    }

    highlightCurrentPage() {
      const elements = this.shadowRoot.querySelectorAll(`[data-page=${this.attributes.page.value}`);
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
    }
  }
  window.customElements.define('custom-header', CustomHeader);
}


