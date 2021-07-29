const cacheDynamicName = "dynamic-cache-v2";
const cacheStaticName = "static-cache";

const appShell = [
    "/",
    '/about-me',
    '/contact',
    '/resume',
    '/projects',
    "/_next/static/chunks/173-e40fb0f5fd7e33b310ab.js	",
    "/_next/static/chunks/2b7b2d2a-cacffe8ddf7f84a0ef3f.js",
    "/_next/static/chunks/865-8f6e0d4c3d15d5f45241.js",
    "/_next/static/chunks/883-e73d826062bc69870854.js	",
    "/_next/static/chunks/framework-0441fae7fd130f37dee1.js",
    "/_next/static/chunks/main-0786f78015b8368a3815.js",
    "/_next/static/chunks/webpack-6aa24242c38afc8913a0.js",
    "/_next/static/chunks/pages/_app-4b9658a3c9339e2dd88c.js",
    "/_next/static/chunks/pages/about-me-cdbb60a648cacacf2698.js",
    "/_next/static/chunks/pages/contact-b172d2b1d1b9a442bb0d.js",
    "/_next/static/chunks/pages/index-669909621c2fccb5266c.js",
    "/_next/static/chunks/pages/projects-453c016d2cf0219305de.js",
    "/_next/static/chunks/pages/resume-66024960114fb8abfbd4.js",
    "/_next/static/css/4adfb75a9665db5145e0.css",
    "/_next/static/css/4ca6ec0d24f059e6539f.css",
    "/_next/static/css/6fc1e446ecfd3f4b746e.css",
    "/_next/static/css/7cf7952e9788abce8968.css",
    "/_next/static/css/aa2683cd2f43a49ab754.css",
    "/_next/static/css/d1f532d7cd30524ab638.css",
    "/_next/static/9_5KsFZ2SyLfR2t9bThWM/_buildManifest.js",
    "/_next/static/9_5KsFZ2SyLfR2t9bThWM/_ssgManifest.js",
    "/assets/MyPhotoPNG.png",
    "/assets/codepad-light.png",
    "/assets/codepad.png",
    "/assets/icons/Circle.svg",
    "/assets/icons/Css3Icon.svg",
    "/assets/icons/DevOps.jpeg",
    "/assets/icons/Html5Icon.svg",
    "/assets/icons/LinkedinLogo.svg",
    "/assets/icons/ResumeIcon.svg",
    "/assets/icons/SassLogo.svg",
    "/assets/icons/arrow.svg",
    "/assets/icons/cloud.svg",
    "/assets/icons/eyeIcon.svg",
    "/assets/icons/gitLogo.svg",
    "/assets/icons/githubLogo.svg",
    "/assets/icons/javascriptLogo.svg",
    "/assets/icons/next-js.svg",
    "/assets/icons/nodejs.svg",
    "/assets/icons/nosql.svg",
    "/assets/icons/npm.svg",
    "/assets/icons/reactLogo.svg",
    "/assets/icons/sql.jpeg",
    "/assets/icons/tailwind.svg",
    "/favicon.ico",
    "/icon-192x192.png",
    "/manifest.json",
  ]

// verify server worker is installed and cache app shell
self.addEventListener("install", function (event) {
  console.log("Hello world from the Service Worker 🤙");

  event.waitUntil(
    caches.open(cacheStaticName).then(function (cache) {
      return cache.addAll(appShell);
    })
  );
});

// Remove Previous cache if service worker got updated
self.addEventListener("activate", (evt) => {
  evt.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys
          .filter((key) => key !== cacheStaticName)
          .map((key) => caches.delete(key))
      );
    })
  );
});

// check if asset is in cache, return it from cache if it is already there
// otherwise pull it from the web and add it assets to cache and return as well.
self.addEventListener("fetch", (evt) => {
  if (!(evt.request.url.indexOf("http") === 0)) return;

  evt.respondWith(
    caches.match(evt.request).then((cacheRes) => {
      return (
        cacheRes ||
        fetch(evt.request).then((fetchRes) => {
          return caches.open(cacheDynamicName).then((cache) => {
            cache.put(evt.request.url, fetchRes.clone());
            return fetchRes;
          });
        })
      );
    })
  );
});
