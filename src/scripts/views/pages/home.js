import RestaurantSource from '../../data/restaurant-source';
import '../components/restaurant-card';
import '../components/loader-bar';
import '../components/offline-note';

const Home = {
  async render() {
    return `
      <h1 class='page-header'>Restaurant List</h1>
      <div class='restaurant-container'>
        <div class='loader-container'>
          <loader-bar></loader-bar>
        </div>
      </div>
      `;
  },

  async afterRender() {
    const restaurantContainer = document.querySelector('.restaurant-container');
    try {
      const restaurants = await RestaurantSource.restaurantList();
      restaurantContainer.innerHTML = '';
      restaurants.forEach((restaurant) => {
        const restaurantCard = document.createElement('restaurant-card');
        restaurantCard.restaurant = restaurant;
        restaurantContainer.append(restaurantCard);
      });
    } catch (error) {
      document.querySelector('.page-header').remove();
      restaurantContainer.innerHTML = '';
      restaurantContainer.append(document.createElement('offline-note'));
    }
  },
};

export default Home;
