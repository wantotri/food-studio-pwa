import CONFIG from '../../globals/config';
import FavoriteRestaurantIdb from '../../data/favoriteRestaurant-idb';
import RestaurantSource from '../../data/restaurant-source';
import UrlParser from '../../routes/url-parser';
import '../components/loader-bar';
import '../components/like-button';
import '../components/detail-image';
import '../components/detail-info';
import '../components/detail-menu';
import '../components/detail-review';
import '../components/detail-form';
import '../components/offline-note';

const Detail = {
  async render() {
    return `
      <div class='detail-container'>
        <div class='loader-container'>
          <loader-bar></loader-bar>
        </div>
      </div>
      <div id='likeButtonContainer'></div>
      <div class='back-button'>
        <a href='#/home'>&#8617; Go to Restaurant List</a>
      </div>
      `;
  },

  async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const detailContainer = document.querySelector('.detail-container');
    const loader = document.querySelector('.loader-container');

    const savedRestaurant = await FavoriteRestaurantIdb.getRestaurant(url.id);
    if (savedRestaurant) {
      loader.remove();
      this.renderDetail(detailContainer, savedRestaurant);
    } else {
      try {
        const restaurant = await RestaurantSource.restaurantDetail(url.id);
        loader.remove();
        this.renderDetail(detailContainer, restaurant);
      } catch (error) {
        loader.remove();
        detailContainer.append(document.createElement('offline-note'));
      }
    }
  },

  async renderDetail(container, restaurant) {
    const header = document.createElement('h2');
    header.innerText = restaurant.name;
    header.style.textAlign = 'center';
    header.classList.add('detail-title');

    const image = document.createElement('detail-image');
    image.setAttribute('src', `${CONFIG.BASE_IMAGE_URL}medium/${restaurant.pictureId}`);
    image.setAttribute('alt', restaurant.name);

    const info = document.createElement('detail-info');
    info.info = {
      rating: restaurant.rating,
      city: restaurant.city,
      address: restaurant.address,
    };

    const menu = document.createElement('detail-menu');
    menu.menu = {
      categories: restaurant.categories,
      foods: restaurant.menus.foods,
      drinks: restaurant.menus.drinks,
    };

    const review = document.createElement('detail-review');
    review.customerReviews = restaurant.customerReviews;

    const formulir = document.createElement('detail-form');
    formulir.setAttribute('restaurant-id', restaurant.id);
    formulir.setAttribute('target-url', `${CONFIG.BASE_URL}review`);

    container.append(header, image, info, menu, review, formulir);

    const likeButtonContainer = document.querySelector('#likeButtonContainer');
    await this.renderLikeButton(likeButtonContainer, restaurant);
    header.scrollIntoView();
  },

  async renderLikeButton(container, restaurant) {
    const likeButton = document.createElement('like-button');
    const likedRestaurant = await FavoriteRestaurantIdb.getRestaurant(restaurant.id);

    likeButton.setAttribute('liked', likedRestaurant ? 'true' : 'false');
    likeButton.setAttribute('data-id', restaurant.id);
    container.append(likeButton);

    const likeShadowRoot = document.querySelector(`[data-id="${restaurant.id}"]`).shadowRoot;
    likeShadowRoot.querySelector('#likeButton').addEventListener('click', async () => {
      if (likeButton.getAttribute('liked') === 'false') {
        await FavoriteRestaurantIdb.deleteRestaurant(restaurant.id);
      } else {
        await FavoriteRestaurantIdb.putRestaurant(restaurant);
      }
    });
  },
};

export default Detail;
