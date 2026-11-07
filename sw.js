/* Funzionamento offline: prima la rete, se manca si usa l'ultima copia salvata */
var C='kit-lab-v';
self.addEventListener('install',function(){self.skipWaiting()});
self.addEventListener('activate',function(e){e.waitUntil(caches.keys().then(function(k){return Promise.all(k.filter(function(n){return n!==C}).map(function(n){return caches.delete(n)}))}).then(function(){return self.clients.claim()}))});
self.addEventListener('fetch',function(e){
if(e.request.method!=='GET')return;
e.respondWith(fetch(e.request).then(function(r){if(r&&(r.ok||r.type==='opaque')){var c=r.clone();caches.open(C).then(function(h){h.put(e.request,c)})}return r}).catch(function(){return caches.match(e.request,{ignoreSearch:true})}))});
