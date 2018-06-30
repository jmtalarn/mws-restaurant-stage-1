const CACHE_NAME = "mws-restaurant-cache";
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll([
        '/cached.html',
        '/js/cached.js'
      ]);
    })
  );
});
self.addEventListener('fetch', function(event) {
    event.respondWith(
      caches.open(CACHE_NAME).then(function(cache) {
        return fetch(event.request).then(function(response) {
          if (event.request.method=="GET" &&
          !(/^https:\/\/fonts\.googleapis\.com\//.test(event.request.url)) &&
          !(/^https:\/\/fonts\.gstatic\.com\//.test(event.request.url)) && 
          event.request.url.indexOf("browser-sync/socket.io")==-1
          ){
          cache.put(event.request, response.clone());
          
         }
          return response;
        }).catch(err=>{
            return cache.match(event.request)
              .then( response=> (response || cache.match("/cached.html")) );
        });
      })
    );
  });