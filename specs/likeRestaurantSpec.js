import Detail from '../src/scripts/views/pages/detail';
import FavoriteRestaurantIdb from '../src/scripts/data/favoriteRestaurant-idb';
import '../src/scripts/views/components/like-button';

describe('Like Button:', () => {
  const addLikeButtonContainer = () => {
    document.body.innerHTML = "<div id='likeButtonContainer'></div>";
  };

  const createLikeButton = async (restaurant = { id: 1 }) => {
    const likeButtonContainer = document.querySelector('#likeButtonContainer');
    await Detail.renderLikeButton(likeButtonContainer, restaurant);
  };

  const clickLikeButton = () => {
    const likeButton = document.querySelector('like-button').shadowRoot;
    likeButton.querySelector('#likeButton').dispatchEvent(new Event('click'));
  };

  afterEach(async () => {
    await FavoriteRestaurantIdb.deleteAllRestaurants();
  });

  describe('Liking a Restaurant', () => {
    beforeEach(() => {
      addLikeButtonContainer();
    });

    it('should show the like button when the restaurant has not been liked before', async () => {
      await createLikeButton();
      expect(document.querySelector('[liked="false"]')).toBeTruthy();
    });

    it('should not show the unlike button when the restaurant has not been liked before', async () => {
      await createLikeButton();
      expect(document.querySelector('[liked="true"]')).toBeFalsy();
    });

    it('should be able to like the restaurant', async () => {
      await createLikeButton();
      clickLikeButton();
      expect(await FavoriteRestaurantIdb.getRestaurant(1)).toEqual({ id: 1 });
    });

    it('should not add a restaurant again when its already liked', async () => {
      await createLikeButton();
      await FavoriteRestaurantIdb.putRestaurant({ id: 1 });
      clickLikeButton();
      expect(await FavoriteRestaurantIdb.getAllRestaurants()).toEqual([{ id: 1 }]);
    });

    it('should not add a restaurant when it has no id', async () => {
      await createLikeButton({});
      clickLikeButton();
      expect(await FavoriteRestaurantIdb.getAllRestaurants()).toEqual([]);
    });
  });

  describe('Unliking a Restaurant', () => {
    beforeEach(async () => {
      addLikeButtonContainer();
      await FavoriteRestaurantIdb.putRestaurant({ id: 1 });
      await createLikeButton();
    });

    it('should show the unlike button when the restaurant has been liked', async () => {
      expect(document.querySelector('[liked="true"]')).toBeTruthy();
    });

    it('should not show the like button when the restaurant has been liked', async () => {
      expect(document.querySelector('[liked="false"]')).toBeFalsy();
    });

    it('should be able to unlike restaurant', async () => {
      clickLikeButton();
      expect(await FavoriteRestaurantIdb.getAllRestaurants()).toEqual([]);
    });

    it('should not throw error if the unliked restaurant is not in the list', async () => {
      await FavoriteRestaurantIdb.deleteRestaurant(1);
      clickLikeButton();
      expect(await FavoriteRestaurantIdb.getAllRestaurants()).toEqual([]);
    });
  });
});
