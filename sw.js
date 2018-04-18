importScripts(
  'https://storage.googleapis.com/workbox-cdn/releases/3.1.0/workbox-sw.js',
);
workbox.precaching.precacheAndRoute([
  {
    "url": "index.html",
    "revision": "d5a07d504723db86e2230a30fbb84e76"
  },
  {
    "url": "main.62aca55e.js",
    "revision": "705dc2bcdc323fd29ea02e6e80232ca0"
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
    "revision": "2ef500940444a11dae48fa0af88769df"
  }
]);
