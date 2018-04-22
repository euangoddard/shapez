importScripts(
  'https://storage.googleapis.com/workbox-cdn/releases/3.1.0/workbox-sw.js',
);
workbox.precaching.precacheAndRoute([
  {
    "url": "index.html",
    "revision": "832224e436f3c618c865e4b799e71154"
  },
  {
    "url": "main.fceb9ccb.js",
    "revision": "62875c837a175c9f51f8613070109751"
  },
  {
    "url": "manifest.130416d0.js",
    "revision": "1fe3e218d86527898c0f891901c51593"
  },
  {
    "url": "styles.be6ba454.css",
    "revision": "f2b493a934f385107fa5ae33e46319d2"
  },
  {
    "url": "sw-register.69870690.js",
    "revision": "e6d13b700c033dd768d4092d14c3d7fd"
  }
]);
