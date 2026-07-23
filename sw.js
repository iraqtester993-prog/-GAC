const CACHE_NAME = 'gac-store-v3';
const ASSETS = [
    './',
    './index.html',
    './css/style.css',
    './js/app.js',
    './components/AppHeader.js',
    './components/AppNavbar.js',
    './components/GuestWarning.js',
    './pages/LoginPage.js',
    './pages/HomePage.js',
    './pages/CategoriesPage.js',
    './pages/CartPage.js',
    './pages/InstallmentsPage.js',
    './pages/AccountPage.js',
    './pages/CategoryPage.js',
    './manifest.json',
    './icons/icon-192.png',
    './icons/icon-512.png',
    './icons/icon-144.png',
    './icons/icon-96.png'
];

self.addEventListener('install', e => {
    e.waitUntil(
        caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)).then(() => self.skipWaiting())
    );
});

self.addEventListener('activate', e => {
    e.waitUntil(
        caches.keys().then(keys =>
            Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
        ).then(() => self.clients.claim())
    );
});

self.addEventListener('fetch', e => {
    e.respondWith(
        caches.match(e.request).then(cached => cached || fetch(e.request))
    );
});
