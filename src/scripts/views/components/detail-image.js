const template = document.createElement('template');
template.innerHTML = `
  <style>
    img {
      width: 100%;
      border-radius: 5px;
    }
  </style>
  <img id='detail-image' src='' alt=''/>
`;

class DetailImage extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.append(template.content.cloneNode(true));
  }

  connectedCallback() {
    const img = this.shadowRoot.querySelector('#detail-image');
    img.setAttribute('alt', this.getAttribute('alt'));
    img.setAttribute('src', this.getAttribute('src'));
  }
}

window.customElements.define('detail-image', DetailImage);
