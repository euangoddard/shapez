importScripts(
  'https://storage.googleapis.com/workbox-cdn/releases/3.1.0/workbox-sw.js',
);
workbox.precaching.precacheAndRoute([
  {
    "url": "index.html",
    "revision": "4d05053308b029564e49a3d3f3e32e1b"
  },
  {
    "url": "main.9f273d75.js",
    "revision": "9a6aae7dfed4c60b4909c80c47103b04"
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
    "revision": "f2c731926af3f86592c6c6a4273375cf"
  }
]);
