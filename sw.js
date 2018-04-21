importScripts(
  'https://storage.googleapis.com/workbox-cdn/releases/3.1.0/workbox-sw.js',
);
workbox.precaching.precacheAndRoute([
  {
    "url": "index.html",
    "revision": "d5b103bd72d32fe28e5bf8af0ed7fdbd"
  },
  {
    "url": "main.e245ba08.js",
    "revision": "3da7af39f010e3cd9b150f5c73b6f654"
  },
  {
    "url": "manifest.130416d0.js",
    "revision": "006c2fe91e6bb68628fca42f61a03231"
  },
  {
    "url": "styles.c7ecf554.css",
    "revision": "55d1aadd591e79dc98be2fef36cd188b"
  },
  {
    "url": "sw-register.69870690.js",
    "revision": "c77ae26158ca1e15dd523ba756c8b74c"
  }
]);
