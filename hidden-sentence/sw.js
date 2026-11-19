/* Cache the shell so the course keeps working out of range. Bump C when files change. Only this course's own caches are cleared: all the guides share one address, and so one cache store. */
var C = "hidden-sentence-v10";
var FILES = ["./", "index.html", "css/styles.css", "js/content.js", "js/app.js", "icon.svg", "manifest.webmanifest", "../prison-map/places.js", "../prison-map/widget.js", "../prison-map/risdon-aerial.jpg"];
self.addEventListener("install", function (e) { e.waitUntil(caches.open(C).then(function (c) { return c.addAll(FILES); }).then(function () { return self.skipWaiting(); })); });
self.addEventListener("activate", function (e) { e.waitUntil(caches.keys().then(function (k) { return Promise.all(k.filter(function (x) { return x.indexOf("hidden-sentence-") === 0 && x !== C; }).map(function (x) { return caches.delete(x); })); }).then(function () { return self.clients.claim(); })); });
self.addEventListener("fetch", function (e) {
  if (e.request.method !== "GET") return;
  e.respondWith(caches.match(e.request).then(function (r) { return r || fetch(e.request).catch(function () { return caches.match("index.html"); }); }));
});
