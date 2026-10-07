// Replaces the old app's service worker so installed copies stop showing the old version.
// It clears the old app's saved files, removes itself, and reloads open windows,
// which then load the "we've moved" page above.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter((k) => k.startsWith('guitar-v')).map((k) => caches.delete(k)));
    await self.registration.unregister();
    const wins = await self.clients.matchAll({ type: 'window' });
    wins.forEach((w) => w.navigate(w.url).catch(() => {}));
  })());
});
