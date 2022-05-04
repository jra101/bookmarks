const cacheName = 'bookmarks_v2';
const cachedContent = [    
  '/bookmarks/',
  '/bookmarks/index.html',
  '/bookmarks/favicon.png',
  '/bookmarks/favicon_large.png',
  '/bookmarks/noicon.png'
]

self.addEventListener('install', (e) => {
  e.waitUntil((async () => {
    const cache = await caches.open(cacheName);
    await cache.addAll(cachedContent);
  })());
});

self.addEventListener('fetch', (e) => {
  e.respondWith((async () => {
    const r = await caches.match(e.request);
    if (r) return r;

    const response = await fetch(e.request);
    const cache = await caches.open(cacheName);

    cache.put(e.request, response.clone());
    return response;
  })());
});
