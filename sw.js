const CACHE_NAME = 'booknook-v0.1';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icons/icon.svg',
  'https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,800;1,400;1,600&family=Outfit:wght@300;400;500;600;700&display=swap',
  'https://unpkg.com/react@18/umd/react.production.min.js',
  'https://unpkg.com/react-dom@18/umd/react-dom.production.min.js',
  'https://unpkg.com/@babel/standalone/babel.min.js',
  'https://unpkg.com/@zxing/library@0.21.3/umd/index.min.js'
];

// Install Event: Cache critical shell assets and immediately skip waiting
self.addEventListener('install', event => {
  console.log(`[Book Nook PWA] Installing Service Worker ${CACHE_NAME}`);
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('[Book Nook PWA] Caching app shell assets');
      return cache.addAll(STATIC_ASSETS).catch(err => console.warn('[SW Cache Notice]:', err));
    })
  );
  self.skipWaiting();
});

// Activate Event: Delete any old / previous caches and immediately claim all open clients
self.addEventListener('activate', event => {
  console.log(`[Book Nook PWA] Activating ${CACHE_NAME}`);
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            console.log('[Book Nook PWA] Purging outdated cache:', key);
            return caches.delete(key);
          }
        })
      );
    }).then(() => {
      console.log('[Book Nook PWA] Claiming clients for instant update');
      return self.clients.claim();
    })
  );
});

// Listen for explicit skipWaiting message
self.addEventListener('message', event => {
  if (event.data && event.data.action === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// Fetch Event: Network-first for HTML and API to guarantee fresh versions, Stale-while-revalidate for CDN/images
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // 1. API Calls: Network First
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(
      fetch(event.request).catch(() => {
        return new Response(JSON.stringify({ error: 'Offline mode: changes will sync when connected.' }), {
          headers: { 'Content-Type': 'application/json' },
          status: 503
        });
      })
    );
    return;
  }

  // 2. Main Page / HTML: Network-first with Cache fallback to ensure users always receive latest v0.1 UI
  if (event.request.mode === 'navigate' || url.pathname === '/' || url.pathname.endsWith('.html')) {
    event.respondWith(
      fetch(event.request)
        .then(networkResponse => {
          if (networkResponse && networkResponse.status === 200) {
            const copy = networkResponse.clone();
            caches.open(CACHE_NAME).then(c => c.put(event.request, copy));
          }
          return networkResponse;
        })
        .catch(() => caches.match(event.request).then(cached => cached || caches.match('/index.html')))
    );
    return;
  }

  // 3. Static Assets & CDN: Cache-first / Stale-while-revalidate
  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      const fetchPromise = fetch(event.request)
        .then(networkResponse => {
          if (networkResponse && networkResponse.status === 200 && event.request.method === 'GET') {
            const copy = networkResponse.clone();
            caches.open(CACHE_NAME).then(c => c.put(event.request, copy));
          }
          return networkResponse;
        })
        .catch(() => cachedResponse);

      return cachedResponse || fetchPromise;
    })
  );
});
