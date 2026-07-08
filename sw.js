const CACHE_NAME = 'chave-de-davi-v2';
const APP_SHELL = [
    '/',
    '/index.html',
    '/css/style.css',
    '/js/ministerio.js',
    '/manifest.json',
    '/img/icon.svg',
    '/img/icon-192.png',
    '/img/icon-512.png'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL))
    );
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((keys) =>
            Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)))
        )
    );
    self.clients.claim();
});

self.addEventListener('fetch', (event) => {
    const url = new URL(event.request.url);

    // Nunca cacheia o banco de dados central nem chamadas a serviços externos (liturgia, YouTube, etc.)
    if (event.request.method !== 'GET' || url.pathname.startsWith('/api/') || url.origin !== self.location.origin) {
        return;
    }

    event.respondWith(
        caches.match(event.request).then((cached) => {
            const networkFetch = fetch(event.request)
                .then((response) => {
                    if (response && response.ok) {
                        const clone = response.clone();
                        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
                    }
                    return response;
                })
                .catch(() => cached);

            return cached || networkFetch;
        })
    );
});
