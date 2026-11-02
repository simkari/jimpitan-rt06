const CACHE_NAME = 'jimpitan-v1';
const urlsToCache = [
  './',
  './index.html',
  './lihat_data.html',
  './cek_status.html',
  './laporan_tahunan.html'
];

// Menginstal Service Worker dan menyimpan kerangka HTML
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

// Mengatur lalu lintas jaringan
self.addEventListener('fetch', event => {
  // PENGAMANAN: Jangan pernah cache koneksi API ke Google Script
  if (event.request.url.includes('script.google.com')) {
    return; 
  }
  
  // Untuk file HTML, coba ambil dari internet dulu, jika offline baru ambil dari cache
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});
