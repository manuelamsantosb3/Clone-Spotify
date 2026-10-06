// Bump the shell cache version whenever static app files change; activation removes prior versions.
const CACHE_NAME = "flow-shell-v6";
const APP_SHELL = ["./", "./index.html", "./CSS/style.css", "./JS/main.js", "./JS/firebase-config.js", "./JS/crud.js", "./JS/auth.js", "./JS/likes.js", "./JS/player.js", "./JS/ui.js", "./manifest.json", "./icons/icon.svg", "./icons/icon-192.png", "./icons/icon-512.png"];

self.addEventListener("install", event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(APP_SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key.startsWith("flow-shell-") && key !== CACHE_NAME).map(key => caches.delete(key)))).then(() => self.clients.claim()));
});

self.addEventListener("fetch", event => {
  const request = event.request;
  if (request.method !== "GET") return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  if (request.mode === "navigate") {
    event.respondWith(fetch(request).then(response => {
      if (response.ok) caches.open(CACHE_NAME).then(cache => cache.put("./index.html", response.clone()));
      return response;
    }).catch(() => caches.match("./index.html")));
    return;
  }

  const allowed = new Set(APP_SHELL.map(path => new URL(path, self.registration.scope).pathname));
  if (!allowed.has(url.pathname)) return;
  event.respondWith(caches.match(request).then(cached => cached || fetch(request)));
});


