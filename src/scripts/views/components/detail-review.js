const template = document.createElement('template');
template.innerHTML = `
  <style>
    .detail-review {
      display: grid;
      row-gap: 10px;
    }

    h3 {
      text-align: center;
      margin-top: 10px;
      background-color: lightgray;
      padding: 10px 5px;
      border-radius: 5px;
    }

    figure, blockquote, p {
      margin: 0;
    }

    .customer-review {
      border-radius: 5px;
      background-color: #f0f0f0;
    }

    .customer-review blockquote p {
      padding: 10px 15px;
      line-height: 1.5;
    }

    .customer-review blockquote p::before {
      content: '\\201C';
    }

    .customer-review blockquote p::after {
      content: '\\201D';
    }

    .customer-review figcaption {
      font-size: 0.9em;
      font-style: italic;
      text-align: right;
      padding: 0px 15px 5px;
    }

    @media screen and (min-width: 640px) {
      .detail-review {
        grid-template-columns: 1fr 1fr;
        gap: 10px;
      }
      h3 {
        grid-column-start: 1;
        grid-column-end: 3;
      }
    }
  </style>

  <div class="detail-review">
    <h3 tabindex="0">Customer Reviews</h3>
  </div>
  `;

const sanitize = (string) => string.replace(/(<([^>]+)>)/gi, '');

class DetailReview extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.append(template.content.cloneNode(true));
    this._customerReviews = {};
  }

  set customerReviews(reviews) {
    this._customerReviews = reviews;
    this.renderReviews(5);
  }

  get customerReviews() {
    return this._customerReviews;
  }

  renderReviews(count) {
    const reviewContainer = this.shadowRoot.querySelector('.detail-review');
    this._customerReviews.reverse().slice(0, count).forEach((review) => {
      const sanitizedReview = sanitize(review.review);
      const sanitizedName = sanitize(review.name);
      const customerReview = document.createElement('div');
      customerReview.classList.add('customer-review');
      customerReview.setAttribute('tabindex', '0');
      customerReview.setAttribute('aria-label', `${sanitizedReview} by ${sanitizedName} on ${review.date}`);
      customerReview.innerHTML = `
        <figure>
          <blockquote>
            <p>${sanitizedReview}</p>
          </blockquote>
          <figcaption>${sanitizedName} - ${review.date}</figcaption>
        </figure>
        `;
      reviewContainer.append(customerReview);
    });
  }
}

window.customElements.define('detail-review', DetailReview);
