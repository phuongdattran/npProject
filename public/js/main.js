// Check that service workers are supported
if ('serviceWorker' in navigator) {
    // Use the window load event to keep the page load performant
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw_cached_site.js')
        .then(()=>console.log('Service Worker: registered'))
        .catch((err => console.log(`Service Worker: Error: ${err}`)))
    });
}