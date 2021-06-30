const registerSw = async () => {
  if ('serviceWorker' in navigator) {
    await navigator.serviceWorker.register('./food-studio-sw.js');
    console.log('Service Worker successfully registered.');
  } else {
    console.log('Service Worker not supported by this browser.');
  }
};

export default registerSw;
