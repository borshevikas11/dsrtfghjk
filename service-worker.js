const CACHE_NAME = 'sportlife-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/nutrition.html',
  '/sports.html',
  '/feedback.php',
  '/style.css',
  '/icons/icon-72x72.png',
  '/icons/icon-192x192.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});