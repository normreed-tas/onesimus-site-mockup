/* Cache the shell so the guide works out of range. Bump C when files change. Only this guide's own caches are cleared. */
var C = "cia-guide-v1";
var FILES = ["./", "index.html", "css/styles.css", "js/content.js", "js/app.js", "icon.svg", "manifest.webmanifest"];
self.addEventListener("install", function (e) { e.waitUntil(caches.open(C).then(function (c) { return c.addAll(FILES); }).then(function () { return self.skipWaiting(); })); });
self.addEventListener("activate", function (e) { e.waitUntil(caches.keys().then(function (k) { return Promise.all(k.filter(function (x) { return x.indexOf("cia-guide-") === 0 && x !== C; }).map(function (x) { return caches.delete(x); })); }).then(function () { return self.clients.claim(); })); });
self.addEventListener("fetch", function (e) {
  if (e.request.method !== "GET") return;
  e.respondWith(caches.match(e.request).then(function (r) { return r || fetch(e.request).catch(function () { return caches.match("index.html"); }); }));
});
