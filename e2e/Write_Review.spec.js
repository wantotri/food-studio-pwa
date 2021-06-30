Feature('Write Review');

Before(({ I }) => {
  I.amOnPage('/');
});

const review = {
  'name': 'Ronaldo',
  'review': 'Very Recommended'
}

Scenario('successfully write a review', async ({ I }) => {
  I.click({ shadow: ['restaurant-card', 'div>a'] });
  I.fillField({ shadow: ['detail-form', 'input#name'] }, review.name);
  I.fillField({ shadow: ['detail-form', 'textarea#review'] }, review.review);
  I.click({ shadow: ['detail-form', 'input.submit-button'] });
  I.waitForElement({ shadow: ['detail-form', '.pop-up'] });
  I.see('Review has beed added.', { shadow: ['detail-form', '.pop-up'] })
});

Scenario('check if the submitted review exists', async ({ I }) => {
  I.click({ shadow: ['restaurant-card', 'div>a'] });
  I.seeElement({ shadow: ['detail-review', '.customer-review'] });
  I.see(review.name, { shadow: ['detail-review', '.customer-review'] });
  I.see(review.review, { shadow: ['detail-review', '.customer-review'] });
});
