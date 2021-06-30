const template = document.createElement('template');
template.innerHTML = `
  <style>
    .info {
      display: grid;
      row-gap: 10px;
      grid-template-columns: 1fr 2fr;
    }

    h3 {
      text-align: center;
      margin-top: 10px;
      background-color: lightgray;
      padding: 10px 5px;
      border-radius: 5px;
      grid-column-start: 1;
      grid-column-end: 3;
    }

    h4, p {
      margin: 0;
    }

    .rating:before {
      content: '⭐ ';
    }

    .address:before {
      content: '📍 '
    }

    @media screen and (min-width: 640px) {
      .info {
        grid-template-columns: 1fr 3fr;
      }
    }
  </style>

  <div class="info">
    <h3 tabindex="0">Retaurant Info</h3>
    <h4>Rating</h4>
    <p class="rating" tabindex="0" title="rating"></p>
    <h4>City</h4>
    <p class="city" tabindex="0" title="city"></p>
    <h4>Address</h4>
    <p class="address" tabindex="0" title="address"></p>
  </div>
  `;

class DetailInfo extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.append(template.content.cloneNode(true));
    this._info = {};
  }

  set info(info) {
    this._info = info;
    this.renderInfo();
  }

  get info() {
    return this._info;
  }

  renderInfo() {
    const keys = Object.keys(this._info);
    keys.forEach((key) => {
      this.shadowRoot.querySelector(`.${key}`).innerHTML = this._info[key];
    });
  }
}

window.customElements.define('detail-info', DetailInfo);
