import itActsAsFavoriteRestaurantModel from './contract/favoriteRestaurantContract';
import FavoriteRestaurantIdb from '../src/scripts/data/favoriteRestaurant-idb';

describe('Favorite Restaurant Idb Contract Test Implementation', () => {
  afterEach(async () => {
    await FavoriteRestaurantIdb.deleteAllRestaurants();
  });

  itActsAsFavoriteRestaurantModel(FavoriteRestaurantIdb);
});
