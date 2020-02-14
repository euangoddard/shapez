importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.1.0/workbox-sw.js');
workbox.precaching.precacheAndRoute([
  {
    "url": "index.html",
    "revision": "1bec3f961daf385a0d3f52c14c8f188f"
  },
  {
    "url": "main.4ecd54e5.js",
    "revision": "2ea2874ff8ad972ab3c11c7b3254bba3"
  },
  {
    "url": "styles.173b00b6.css",
    "revision": "8fde0e6bdc0221bbbbae387dcc3369ad"
  },
  {
    "url": "sw-register.35d92dfc.js",
    "revision": "a01350a0a766d8bf1b48a73b41fe410e"
  },
  {
    "url": "worker.f23e6e88.js",
    "revision": "a7899ef6ab5d00e97a30f62a3debdfc8"
  }
]);
