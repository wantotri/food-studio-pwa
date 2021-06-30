import FavoriteRestaurantIdb from '../../data/favoriteRestaurant-idb';
import '../components/restaurant-card';

const Favorite = {
  async render() {
    return `
      <h1>Favorite Restaurant(s)</h1>
      <div class='restaurant-container'>
        <div class="loader-container">You don't have any favorite restaurant.</div>
      </div>
      <div class='back-button'>
        <a href='#/home'>&#8617; Go to Restaurant List</a>
      </div>
      `;
  },

  async afterRender() {
    const favoriteRestaurants = await FavoriteRestaurantIdb.getAllRestaurants();
    if (favoriteRestaurants[0]) {
      const restaurantContainer = document.querySelector('.restaurant-container');
      restaurantContainer.innerHTML = '';
      favoriteRestaurants.forEach((restaurant) => {
        const restaurantCard = document.createElement('restaurant-card');
        restaurantCard.restaurant = restaurant;
        restaurantContainer.append(restaurantCard);
      });
    }
  },
};

export default Favorite;
