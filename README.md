# food-studio-pwa

This Progressive Web Application (PWA) is my accepted submission for "Menjadi Front-End Development Expert" course at [Dicoding](Dicoding.com).

Take a look at the deployed app [here](https://food-studio-b3d04.web.app/).

## Run this app in local server

1. Clone or Download this repo
2. Open project root directory in console or terminal
2. Install the dependencies: `npm install`
3. Create `.env` file, place it in project root directory
    ```
    KEY=api-secret-key
    BASE_URL=api-base-url
    BASE_IMAGE_URL=api-base-image-url
    ```
4. Run the development-server `npm run start-dev`
5. Open `localhost:8080` in your browser

## Testing

### Integration Test

1. Open project root directory in console or terminal
2. Run `npm run test`

### End-to-End Test

1. Open the webdriver (can be downloaded [here](https://chromedriver.chromium.org/downloads))
2. Open project root directory in console or terminal
3. Run `npm run start-dev` to start the development server
4. Open new console/terminal tab
5. Run `npm run e2e`
