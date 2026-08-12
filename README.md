shapez
======

Shape drawing game for kids

Development
-----------

```
npm install
npm run dev        # start the Vite dev server
npm run build      # typecheck + production build into dist/
npm run preview    # serve the production build locally
npm run deploy     # build, inject the workbox precache manifest, publish to gh-pages
```

The service worker is only registered in production builds. `dist/sw.js` is produced
by `workbox injectManifest` (see `workbox-config.cjs`) from `src/sw.js`, so `npm run
preview` only exercises it after a full `npm run deploy`-style build.
