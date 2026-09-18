/* Big Coffee — service worker
   Guarda o app no celular para funcionar sem internet no domingo.
   Trocar CACHE ao publicar versão nova força todo mundo a baixar o app atualizado. */

const CACHE = 'bigcoffee-v4-2026-09-18';

const LOCAIS = [
  './',
  './index.html',
  './manifest.webmanifest',
  './jspdf.umd.min.js',
  './icon-192.png',
  './icon-512.png',
  './bighome.png'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE)
      .then(c => c.addAll(LOCAIS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

/* Rede primeiro, cache como rede de proteção.
   Assim o app pega o cardápio novo assim que houver sinal, mas continua
   abrindo no porão da igreja se o 4G falhar. */
self.addEventListener('fetch', e => {
  if(e.request.method !== 'GET') return;

  e.respondWith(
    fetch(e.request)
      .then(resp => {
        if(resp && resp.status === 200 && (resp.type === 'basic' || resp.type === 'cors')){
          const copia = resp.clone();
          caches.open(CACHE).then(c => c.put(e.request, copia)).catch(()=>{});
        }
        return resp;
      })
      .catch(() => caches.match(e.request).then(r => r || caches.match('./index.html')))
  );
});
