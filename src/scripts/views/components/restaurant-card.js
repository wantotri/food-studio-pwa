import CONFIG from '../../globals/config';

const template = document.createElement('template');
template.innerHTML = `
  <style>
    .card {
      border: 1px solid #8f8f8f;
      border-radius: 20px;
      font-family: Arial, Helvetica, sans-serif;
      color: #424242;
    }

    .image {
        border-top-left-radius: 20px;
        border-top-right-radius: 20px;
        width: 100%;
        max-height: 180px;
        object-fit: cover;
    }

    .header {
        display: grid;
        grid-template-columns: 1fr 1fr;
        background-color: #666666;
        color: #e4e4e4;
    }

    .title {
        padding: 10px 30px 0;
        font-size: 18px;
        grid-column-start: 1;
        grid-column-end: 3;
    }

    .city {
        padding: 0 30px 10px;
        grid-column-start: 1;
        font-size: 14px;
        color: #e4e4e4;
    }

    .city:before {
      content: '📍 ';
    }

    .rating {
      padding: 0 30px 10px;
      font-size: 14px;
      grid-column-start: 2;
    }

    .rating:before {
      content: '⭐ ';
    }

    .body {
        display: grid;
        row-gap: 10px;
        font-size: 16px;
        padding: 10px 30px;
    }

    .description {
        font-size: 14px;
        line-height: 1.3;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 8;
        -webkit-box-orient: vertical;
    }

    .button {
        display: block;
        text-align: center;
        text-decoration: none;
        color: #666666;
        padding: 15px 20px;
        border: 1px solid #797979;
        border-radius: 5px;
        margin-bottom: 10px;
        transition: box-shadow .3s;
    }

    .button:hover {
        background-color: darkseagreen;
        color:honeydew;
        font-weight: 400;
        border: 1px solid seagreen;
    }
  </style>

  <div class="card" alt="resto image">
    <img class="image lazyload" loading="lazy" width="200" height="180">
    <div class="header" tabindex="0">
        <div class="title"></div>
        <div class="city"></div>
        <div class="rating"></div>
    </div>
    <div class="body">
        <div class="description" tabindex="0"></div>
        <div><a class="button" href="#">Show Detail</a></div>
    </div>
  </div>
  `;

class RestaurantCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this._restaurant = {};
  }

  set restaurant(restaurant) {
    this._restaurant = restaurant;
    this.updateTemplate();
  }

  get restaurant() {
    return this._restaurant;
  }

  async updateTemplate() {
    const resto = this._restaurant;
    const root = this.shadowRoot;
    const image = root.querySelector('.image');
    image.setAttribute('src', `${CONFIG.BASE_IMAGE_URL}small/${resto.pictureId}`);
    image.setAttribute('data-src', `${CONFIG.BASE_IMAGE_URL}small/${resto.pictureId}`);
    image.setAttribute('alt', `Restaurant: ${resto.pictureId}`);

    const header = root.querySelector('.header');
    header.setAttribute('aria-label', `Restaurant Name: ${resto.name}, Location: ${resto.city}, Rating: ${resto.rating}`);

    root.querySelector('.title').innerText = resto.name;
    root.querySelector('.city').innerText = resto.city;
    root.querySelector('.rating').innerText = resto.rating;
    root.querySelector('.description').innerText = resto.description;
    root.querySelector('.button').setAttribute('href', `#/detail/${resto.id}`);
  }
}

window.customElements.define('restaurant-card', RestaurantCard);
