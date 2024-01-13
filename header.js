fetch("header.html")
  .then(stream => stream.text())
  .then(text => define(text));


function define(html) {
  class CustomHeader extends HTMLElement {
    constructor() {
      super();
      const shadow = this.attachShadow({ mode: 'open' });
      shadow.innerHTML = html;

      const projectTitle = this.attributes.project ?
        this.attributes.project.value : '';
      this.shadowRoot.querySelector('.project-title')
        .innerHTML = projectTitle;

      this.shadowRoot.querySelector('.toggle-button')
        .addEventListener('click', e => {
          this.toggleHeader();
          e.stopPropagation();
        });
      this.shadowRoot.querySelector('.project-title')
        .addEventListener('click', e => {
          this.toggleHeader();
          e.stopPropagation();
        });
      this.addEventListener('mouseenter', e => {
          this.expandHeader();
          e.stopPropagation();
      });
      this.addEventListener('mouseleave', e => {
          this.collapseHeader();
          e.stopPropagation();
      });
    }

    highlightCurrentPage() {
      const currentPage = this.attributes.page.value;
      const elements =
        this.shadowRoot.querySelectorAll(`[data-page=${currentPage}`);
      for (const element of elements) {
        element.classList.add('current-page');
        element.parentElement.classList.add('current-page');
      }
    }

    collapseHeader(e) {
      const nav = this.shadowRoot.querySelector('.collapsible-nav');
      const button = this.shadowRoot.querySelector('.toggle-button');

      if (nav.classList.contains('expanded')) {
        button.innerText = '+';
        nav.classList.remove('expanded');
      } 
    }

    expandHeader(e) {
      const nav = this.shadowRoot.querySelector('.collapsible-nav');
      const button = this.shadowRoot.querySelector('.toggle-button');

      if (!nav.classList.contains('expanded')) {
        button.innerText = '-';
        nav.classList.add('expanded');
      }
    }

    toggleHeader(e) {
      const nav = this.shadowRoot.querySelector('.collapsible-nav');

      if (nav.classList.contains('expanded')) {
        this.collapseHeader(e);
      } else {
        this.expandHeader(e);
      }
    }

    connectedCallback() {
      this.highlightCurrentPage();
    }
  }
  window.customElements.define('custom-header', CustomHeader);
}


