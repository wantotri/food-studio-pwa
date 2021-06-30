const template = document.createElement('template');
template.innerHTML = `
  <style>
    .like {
      font-size: 18px;
      position: fixed;
      bottom: 16px;
      right: 16px;
      background-color: #dabd5f;
      color: red;
      border: 0;
      border-radius: 50%;
      width: 55px;
      height: 55px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .pop-up {
      visibility: hidden;
      opacity: 0;
      transition: visibility 0s 0.3s, opacity 0.3s linear;
      font-size: 0.9em;
      position: fixed;
      bottom: 80px;
      right: 16px;
      min-width: 44px;
      min-height: 44px;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      border-radius: 5px;
      background-color: #dabd5f;
    }

    .message {
      padding: 10px 0 10px 20px;
    }

    .close-button {
      padding: 15px 20px;
      border-top-right-radius: 5px;
      border-bottom-right-radius: 5px;
      background-color: inherit;
      border: none;
      cursor: pointer;
    }
  </style>

  <button id="likeButton" class="like"></button>
  <div class="pop-up">
    <div tabindex="0" class="message">Added to your favorite</div>
    <button type="button" class="close-button" aira-label="close popup">x</button>
  </div>
  `;

class LikeButton extends HTMLElement {
  static get observedAttributes() {
    return ['liked'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    const likeButton = this.shadowRoot.querySelector('#likeButton');
    const popup = this.shadowRoot.querySelector('.pop-up');
    likeButton.addEventListener('click', async (event) => {
      event.stopPropagation();
      if (this.getAttribute('liked') === 'true') {
        this.setAttribute('liked', 'false');
        popup.querySelector('.message').innerText = 'Removed from your favorite';
      } else {
        this.setAttribute('liked', 'true');
        popup.querySelector('.message').innerText = 'Added to your favorite';
      }
      popup.style.visibility = 'visible';
      popup.style.opacity = 1;
      popup.style.transition = 'opacity 0.3s linear';
    });
    popup.querySelector('.close-button').addEventListener('click', () => {
      popup.style.visibility = 'hidden';
      popup.style.opacity = 0;
      popup.style.transition = 'visibility 0s 0.3s, opacity 0.3s linear';
    });
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      const likeButton = this.shadowRoot.querySelector('#likeButton');
      if (newValue === 'true') {
        likeButton.setAttribute('title', 'unlike this restaurant');
        likeButton.setAttribute('aria-label', 'unlike this restaurant');
        likeButton.innerText = '💕';
      } else {
        likeButton.setAttribute('title', 'like this restaurant');
        likeButton.setAttribute('aria-label', 'like this restaurant');
        likeButton.innerText = '🤍';
      }
    }
  }
}

window.customElements.define('like-button', LikeButton);
