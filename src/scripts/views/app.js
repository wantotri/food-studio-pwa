import DrawerInitiator from '../utils/drawer-initiator';
import UrlParser from '../routes/url-parser';
import routes from '../routes/routes';

class App {
  constructor({ button, drawer, content, navLinks }) {
    this._button = button;
    this._drawer = drawer;
    this._content = content;
    this._navLinks = navLinks;

    this._initialAppShell();
  }

  _initialAppShell() {
    DrawerInitiator.init({
      button: this._button,
      drawer: this._drawer,
      content: this._content,
      navLinks: this._navLinks,
    });
  }

  async renderPage() {
    const url = UrlParser.parseActiveUrlWithCombiner();
    const page = routes[url];
    window.scrollTo(0, 0);
    this._content.innerHTML = await page.render();
    await page.afterRender();
  }
}

export default App;
