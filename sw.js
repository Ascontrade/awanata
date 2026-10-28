// Service worker cangkang Awanata: hanya menyimpan berkas cangkang (ikon, halaman pembuka) agar aplikasi bisa dipasang.
// Data keuangan TIDAK pernah disimpan di HP — semua permintaan ke Google Apps Script langsung ke jaringan.
var CACHE = 'awanata-shell-v1';
var FILES = ['./', 'index.html', 'manifest.webmanifest', 'icon-192.png', 'icon-512.png', 'maskable-512.png', 'apple-touch-icon.png', 'favicon-32.png'];

self.addEventListener('install', function (e) {
  e.waitUntil(caches.open(CACHE).then(function (c) { return c.addAll(FILES); }).then(function () { return self.skipWaiting(); }));
});

self.addEventListener('activate', function (e) {
  e.waitUntil(caches.keys().then(function (keys) {
    // hanya hapus cache Awanata versi lama — origin ascontrade.github.io juga dipakai aplikasi ASCON
    return Promise.all(keys.filter(function (k) { return k.indexOf('awanata-') === 0 && k !== CACHE; }).map(function (k) { return caches.delete(k); }));
  }).then(function () { return self.clients.claim(); }));
});

self.addEventListener('fetch', function (e) {
  var url = new URL(e.request.url);
  if (e.request.method !== 'GET' || url.origin !== self.location.origin) return;   // Apps Script & Google: selalu jaringan
  // jaringan dulu (versi terbaru), cadangan dari cache bila offline
  e.respondWith(fetch(e.request).then(function (res) {
    var copy = res.clone();
    caches.open(CACHE).then(function (c) { c.put(e.request, copy); });
    return res;
  }).catch(function () { return caches.match(e.request).then(function (r) { return r || caches.match('index.html'); }); }));
});
