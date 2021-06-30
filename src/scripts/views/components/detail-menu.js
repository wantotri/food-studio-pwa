const template = document.createElement('template');
template.innerHTML = `
  <style>
    .menu {
      display: grid;
      row-gap: 15px;
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

    h4 {
      margin: 0;
    }

    p {
      margin: 0;
      line-height: 1.5;
    }

    .menu-category {
      background-color: coral;
      color: oldlace;
      border-radius: 5px;
      padding: 3px 10px;
    }

    @media screen and (min-width: 640px) {
      .menu {
        grid-template-columns: 1fr 3fr;
      }
    }
  </style>

  <div class="menu">
    <h3 tabindex="0">Menu</h3>
    <h4>Categories</h4>
    <p class="categories" tabindex="0" title="categories"></p>
    <h4>🍝 Foods</h4>
    <p class="foods" tabindex="0" title="foods"></p>
    <h4>🍹 Drinks</h4>
    <p class="drinks" tabindex="0" title="drinks"></p>
  </div>
  `;

class DetailMenu extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.append(template.content.cloneNode(true));
    this._menu = {};
  }

  set menu(menu) {
    this._menu = menu;
    this.renderMenu();
  }

  get menu() {
    return this._menu;
  }

  renderMenu() {
    const categoriesContainer = this.shadowRoot.querySelector('.categories');
    this._menu.categories.forEach((category) => {
      categoriesContainer.innerHTML += `<span class="menu-category">${category.name}</span> `;
    });

    const foodsContainer = this.shadowRoot.querySelector('.foods');
    this._menu.foods.forEach((item, key, arr) => {
      if (Object.is(arr.length - 1, key)) {
        foodsContainer.innerHTML += `${item.name}.`;
      } else {
        foodsContainer.innerHTML += `${item.name}, `;
      }
    });

    const drinksContainer = this.shadowRoot.querySelector('.drinks');
    this._menu.drinks.forEach((item, key, arr) => {
      if (Object.is(arr.length - 1, key)) {
        drinksContainer.innerHTML += `${item.name}.`;
      } else {
        drinksContainer.innerHTML += `${item.name}, `;
      }
    });
  }
}

window.customElements.define('detail-menu', DetailMenu);
