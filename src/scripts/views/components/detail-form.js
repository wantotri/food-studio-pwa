const template = document.createElement('template');
template.innerHTML = `
  <style>
  h3 {
    text-align: center;
    margin-top: 10px;
    background-color: lightgray;
    padding: 10px 5px;
    border-radius: 5px;
    grid-column-start: 1;
    grid-column-end: 3;
  }

  .review-form {
    display: grid;
    gap: 10px;
    margin-top: 15px;
  }

  .form-control {
    display: grid;
    grid-template-columns: 1fr 3fr;
  }

  .form-control-hidden {
    display: none;
  }

  .review-form textarea,
  .review-form input,
  .review-form button {
    font-family: inherit;
    font-size: inherit;
    padding: 12px;
    border: 1px solid #c4c4c4;
    border-radius: 5px;
  }

  .review-form textarea:focus-visible,
  .review-form input:focus-visible {
    outline: 2px solid rgba(46, 139, 86, 0.671);
    outline-offset: -2px;
  }

  .review-form label {
    padding: 12px;
  }

  .submit-button {
    border: none;
    border-radius: 5px;
    background-color: seagreen;
    color: whitesmoke;
    min-height: 44px;
    min-width: 44px;
    width: 100%;
  }

  .submit-button:hover {
    box-shadow: 0 0 10px aquamarine;
  }

  .pop-up {
    visibility: hidden;
    opacity: 0;
    transition: visibility 0s 0.3s, opacity 0.3s linear;
    font-size: 0.9em;
    position: fixed;
    top: 22px;
    right: 16px;
    min-width: 44px;
    min-height: 44px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    border-radius: 5px;
    background-color: seagreen;
    color: white;
  }

  .message {
    padding: 10px 0 10px 20px;
  }

  .close-button {
    padding: 15px 20px;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
    background-color: inherit;
    color: white;
    border: none;
    cursor: pointer;
  }
  </style>

  <div class="review-form-container">
    <h3 tabindex="0">Write Your Review</h3>
    <form method="POST" class="review-form" aria-label="Add Your Review">
      <div class="form-control form-control-hidden">
        <label for="id">Id</label>
        <input type="text" name="restaurantId" id="restaurantId" required>
      </div>
      <div class="form-control">
        <label for="name">Name</label>
        <input type="text" name="name" id="name" required>
      </div>
      <div class="form-control">
        <label for="review">Review</label>
        <textarea name="review" id="review" rows="4" required></textarea>
      </div>
      <div class="submit-button-container">
        <input type="submit" value="Submit" class="submit-button">
      </div>
    </form>
  </div>
  <div class="pop-up">
    <div class="message" tabindex="0">Failed to add review.</div>
    <button type="button" class="close-button" aria-label="close popup">x</button>
  </div>
  `;

class DetailForm extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.append(template.content.cloneNode(true));
  }

  connectedCallback() {
    const formulir = this.shadowRoot.querySelector('.review-form');
    formulir.restaurantId.value = this.getAttribute('restaurant-id');
    formulir.addEventListener('submit', async (event) => {
      event.preventDefault();
      const requestHeader = {
        'Content-Type': 'application/json',
        'X-Auth-Token': '12345',
      };

      const requestBody = {
        id: formulir.restaurantId.value,
        name: formulir.name.value,
        review: formulir.review.value,
      };

      try {
        const response = await fetch(this.getAttribute('target-url'), {
          method: 'POST',
          headers: requestHeader,
          body: JSON.stringify(requestBody),
        });
        const responseJson = await response.json();
        if (responseJson.error) {
          this._renderPopup('Failed to add review.', 'crimson');
        } else {
          this._renderPopup('Review has beed added.', 'seagreen');
        }
        setTimeout(() => window.location.reload(), 3000);
      } catch (error) {
        this._renderPopup('Can\'t add review while offline.', 'crimson');
      }
    });
  }

  _renderPopup(message, color) {
    const popup = this.shadowRoot.querySelector('.pop-up');
    popup.querySelector('.message').innerText = message;
    popup.style.background = color;
    popup.style.visibility = 'visible';
    popup.style.opacity = 1;
    popup.style.transition = 'opacity 0.3s linear';

    popup.querySelector('.close-button').addEventListener('click', () => {
      popup.style.visibility = 'hidden';
      popup.style.opacity = 0;
      popup.style.transition = 'visibility 0s 0.3s, opacity 0.3s linear';
    });
  }
}

window.customElements.define('detail-form', DetailForm);
