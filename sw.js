const CACHE_NAME= "mws-restaurant-cache";

self.addEventListener('fetch', function(event) {
    console.log(event.request);
    event.respondWith(
      caches.match(event.request).then(function(responseFromCache) {
        return responseFromCache || fetch(event.request).then(function(response) {
          return caches.open(CACHE_NAME).then(function(cache) {
            cache.put(event.request, response.clone());
            return response;
          });  
        });
      })
    );
  });