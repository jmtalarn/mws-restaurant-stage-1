const CACHE_NAME = "mws-restaurant-cache";

self.addEventListener('fetch', function (event) {
  var newResponse = fetch(event.request).then(function (response) {
      var clonedResponse = response.clone();
      if (response.ok) {
          caches.open(CACHE_NAME).then(function (cache) {
              cache.put(event.request, clonedResponse);
          });
      }
      return response;
  });
  var responseInCache = caches.open(CACHE_NAME).then(function (cache) {
      return cache.match(event.request).then(function(response) {
          return response || newResponse;
      });
  }).catch(function (e) {
      return newResponse;
  });
  event.respondWith(responseInCache);
});