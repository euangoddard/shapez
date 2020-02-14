importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.1.0/workbox-sw.js');
workbox.precaching.precacheAndRoute([
  {
    "url": "index.html",
    "revision": "1995d63ed5e7c76ce366e381a451c729"
  },
  {
    "url": "main.4ecd54e5.js",
    "revision": "69aacf6621b3de3b5314bccb2178ec25"
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
    "url": "worker.16b74598.js",
    "revision": "fa4088970bb8bf0cae8c9c086c7b36ab"
  }
]);
