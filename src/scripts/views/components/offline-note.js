const template = document.createElement('template');
template.innerHTML = `
  <style>
    .offline-note {
      display: grid;
      gap: 10px;
      text-align: center;
    }

    h2 {
      margin: 0;
    }

    p {
      margin: 0 0 300px 0;
      line-height: 1.5;
    }
  </style>
  <div class="offline-note">
    <h2 class="title"> You are offline</h2>
    <p class="subtitle">Content will be shown once your connection has been restored.</p>
  </div>
`;

class OfflineNote extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.append(template.content.cloneNode(true));
  }
}

window.customElements.define('offline-note', OfflineNote);
