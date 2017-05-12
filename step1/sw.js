/*
var CACHE_NAME = 'my-site-cache-v1';
var urlsToCache = [
  '/',
  '/public/css/app.css',
  'https://fonts.googleapis.com/icon?family=Material+Icons',
  '/public/js/app.js',
  '/public/js/0.js'
];

self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
    .then(function(cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

// sw does don have acces to dom or window
// thus self becomes default this
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
    .then(function(response) {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});*/
importScripts('/sw-toolbox.js');
importScripts('https://www.gstatic.com/firebasejs/3.6.9/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/3.6.9/firebase-messaging.js');
toolbox.precache([
  '/',
  '/public/js/app.js',
  '/public/js/0.js',
  '/public/js/1.js',
  '/public/css/app.css'
]);

// Runtime caching
toolbox.router.get('/(.*)', toolbox.networkFirst);
toolbox.router.get('/api(.*)', toolbox.fastest, {origin: 'https://randomuser.me'});

const replayQueue = [];

// replay queue
self.addEventListener('sync', () => {
  console.log(replayQueue);
});

self.addEventListener('push', (event)=> {
  const title = 'Push Codelab';
  const options = {
    body: 'Yay it works.',
    icon: 'images/icon.png',
    badge: 'images/icon.png'
  };
  event.waitUntil(self.registration.showNotification(title, options));
});

firebase.initializeApp({
  'messagingSenderId': '678578574774'
});
const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(async function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  // Customize notification here
  const notificationTitle = 'Pipsum!';
  const notificationOptions = {
    body: 'Firebase notif says: ' + payload.data.msg,
    icon: '/images/icon.png'
  };

  return self.registration.showNotification(notificationTitle,
    notificationOptions);
});
