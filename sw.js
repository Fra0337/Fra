'use strict';

// Cache name
const CACHE_NAME = 'abitudini-cache-v1';

// Assets to cache
const ASSETS_TO_CACHE = [
    '/',
    '/index.html',
    '/styles.css',
    '/script.js',
    // Add other assets as needed
];

// Install event
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Caching all: app shell and content');
                return cache.addAll(ASSETS_TO_CACHE);
            })
    );
});

// Fetch event
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Cache hit - return the response from the cached version
                if (response) {
                    return response;
                }
                return fetch(event.request);
            })
    );
});
