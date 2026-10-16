'use strict';
// Bei jeder Veröffentlichung einer geänderten App VERSION erhöhen.
const VERSION = '2.1.0-2026-10-16';
const PREFIX = 'vermoegensaufbau-offline:' + self.registration.scope + ':';
const CACHE = PREFIX + VERSION;
const FILES = ['index.html', 'style.css', 'app.js', 'offline.js', 'manifest.webmanifest', 'icon-180.png', 'icon-192.png', 'icon-512.png'];
const urls = FILES.map(file => new URL(file, self.registration.scope).href);

self.addEventListener('install', event => {
  event.waitUntil((async () => {
    // Die Installation gilt erst nach vollständigem Download als erfolgreich.
    const cache = await caches.open(CACHE);
    await cache.addAll(urls.map(url => new Request(url, { cache: 'reload' })));
  })());
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const names = await caches.keys();
    await Promise.all(names.filter(name => name.startsWith(PREFIX) && name !== CACHE).map(name => caches.delete(name)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  const root = new URL(self.registration.scope);
  if (url.origin !== root.origin || !url.pathname.startsWith(root.pathname)) return;
  const isHome = request.mode === 'navigate' && (url.pathname === root.pathname || url.pathname === root.pathname + 'index.html');
  const resource = isHome ? urls[0] : urls.find(asset => asset === url.origin + url.pathname);
  if (!resource) return;
  // App-Dateien stammen aus derselben vollständig installierten Version.
  // Persönliche Eingaben sind ausschließlich in localStorage, nie im Cache.
  event.respondWith((async () => {
    const cache = await caches.open(CACHE);
    const cached = await cache.match(resource);
    if (cached) return cached;
    const response = await fetch(new Request(resource, { cache: 'reload' }));
    if (response.ok && response.type === 'basic') await cache.put(resource, response.clone());
    return response;
  })());
});

self.addEventListener('message', event => {
  if (event.data?.type === 'SKIP_WAITING') event.waitUntil(self.skipWaiting());
  if (event.data?.type === 'CHECK_OFFLINE') {
    event.waitUntil((async () => {
      const cache = await caches.open(CACHE);
      const available = await Promise.all(urls.map(url => cache.match(url)));
      event.ports[0]?.postMessage({ ready: available.every(Boolean), version: VERSION });
    })());
  }
});
