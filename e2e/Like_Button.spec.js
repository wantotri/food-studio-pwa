Feature('Like Button');

Before(({ I }) => {
  I.amOnPage('/#/favorite');
});

Scenario('showing empty liked restaurant', ({ I }) => {
  I.see('Favorite Restaurant(s)', 'h1');
  I.see('You don\'t have any favorite restaurant.', '.loader-container');
});

Scenario('liking one restaurant', async ({ I }) => {
  I.amOnPage('/');
  I.click({ shadow: ['restaurant-card', 'div>a'] });
  I.waitForElement('#likeButtonContainer');
  I.click({ shadow: ['like-button', 'button']});
  I.see('Added to your favorite', { shadow: ['like-button', '.pop-up'] });
});

Scenario('unliking liked restaurant', async ({ I }) => {
  I.click({ shadow: ['restaurant-card', 'div>a'] });
  I.waitForElement('#likeButtonContainer');
  I.click({ shadow: ['like-button', 'button']});
  I.see('Removed from your favorite', { shadow: ['like-button', '.pop-up'] });
});
