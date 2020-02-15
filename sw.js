importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.1.0/workbox-sw.js');
workbox.precaching.precacheAndRoute([
  {
    "url": "index.html",
    "revision": "457627dce8a30619d5ad259f3d5f70f5"
  },
  {
    "url": "main.01a9b15c.js",
    "revision": "4b0bb13845fd968b89c5b0de17bc99eb"
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
    "url": "worker.bd51d5ea.js",
    "revision": "58b7e3a0c6b16619ce25889c7aa72588"
  }
]);
