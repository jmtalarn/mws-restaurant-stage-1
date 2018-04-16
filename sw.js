const CACHE_NAME = "mws-restaurant-cache";
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll([
        '/cached.html',
        '/js/main.js'
      ]);
    })
  );
});
self.addEventListener('fetch', function(event) {
    event.respondWith(
      caches.open(CACHE_NAME).then(function(cache) {
        return fetch(event.request).then(function(response) {
          cache.put(event.request, response.clone());
          console.log(`Cached ${event.request}`);
          return response;
        }).catch(err=>{
            console.log(`Serving ${event.request} cached response due ${err}`);
            return cache.match(event.request)
              .then( response=> (response || cache.match("/cached.html")) );
        });
      })
    );
  });