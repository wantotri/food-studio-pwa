const template = document.createElement('template');
template.innerHTML = `
  <style>
    .loader-container {
      text-align: center;
      margin-bottom: 300px;
    }

    .loader {
        width:100%;
        margin:0 auto;
        border-radius:10px;
        border:4px solid transparent;
        position:relative;
        padding:1px;
    }

    .loader:before {
        content:'';
        border:1px solid #000;
        border-radius:10px;
        position:absolute;
        top:-4px;
        right:-4px;
        bottom:-4px;
        left:-4px;
    }

    .loader .loader-bar {
        position:absolute;
        border-radius:10px;
        top:0;
        right:100%;
        bottom:0;
        left:0;
        background:#000;
        width:0;
        animation:borealisBar 2s linear infinite;
    }

    @keyframes borealisBar {
        0% {
            left:0%;
            right:100%;
            width:0%;
        }
        10% {
            left:0%;
            right:75%;
            width:25%;
        }
        90% {
            right:0%;
            left:75%;
            width:25%;
        }
        100% {
            left:100%;
            right:0%;
            width:0%;
        }
    }

    /* Loader Layar Sedang */
    @media screen and (min-width: 640px) {
        .loader-container {
            grid-column-start: 1;
            grid-column-end: 3;
        }
    }

    /* Loader Layar Besar */
    @media screen and (min-width: 870px) {
        .loader-container {
            grid-column-start: 1;
            grid-column-end: 4;
        }
    }
  </style>

  <div>Loading data ...</div>
  <div class='loader'>
    <div class='loader-bar'></div>
  </div>
  `;

class LoaderBar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
}

window.customElements.define('loader-bar', LoaderBar);
